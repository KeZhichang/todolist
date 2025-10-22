"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  X,
  Share,
  Users,
  Wifi,
  Download,
  Upload,
  Check,
  AlertCircle,
  RefreshCw,
  Eye,
  EyeOff,
  Copy,
  Settings,
  Server,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/lib/useLanguage";

export function WebRTCShareModal({
  onClose,
  dailyTasks,
  customTags,
  habits,
  darkMode,
  theme,
  onImportData,
}) {
  // State management
  const [isHost, setIsHost] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [status, setStatus] = useState("idle"); // idle, hosting, connecting, connected, shared, error
  const [nearbyPeers, setNearbyPeers] = useState([]);
  const [selectedPeer, setSelectedPeer] = useState(null);
  const [receivedData, setReceivedData] = useState(null);
  const [showReceivedData, setShowReceivedData] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [serverUrl, setServerUrl] = useState("wss://api.prio.space");
  const [showServerConfig, setShowServerConfig] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [connectionState, setConnectionState] = useState("disconnected"); // disconnected, connecting, connected

  // Language support
  const { t } = useLanguage();

  // Refs
  const wsRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const dataChannelRef = useRef(null);
  const pendingActionRef = useRef(null); // Store pending action to execute after connection

  // WebRTC configuration
  const rtcConfig = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
    ],
  };

  const generateRoomId = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = roomId;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  // WebSocket and signaling functions
  const connectToSignalingServer = () => {
    return new Promise((resolve, reject) => {
      try {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          resolve(wsRef.current);
          return;
        }

        // Close existing connection if any
        if (wsRef.current) {
          wsRef.current.close();
        }

        setConnectionState("connecting");
        wsRef.current = new WebSocket(serverUrl);

        const connectionTimeout = setTimeout(() => {
          setStatus("error");
          setErrorMessage(t('webrtc.connectionTimeout'));
          setConnectionState("disconnected");
          reject(new Error("Connection timeout"));
        }, 10000); // 10 second timeout

        wsRef.current.onopen = () => {
          console.log("Connected to signaling server");
          clearTimeout(connectionTimeout);
          setConnectionState("connected");
          resolve(wsRef.current);
        };

        wsRef.current.onmessage = async (event) => {
          const message = JSON.parse(event.data);
          await handleSignalingMessage(message);
        };

        wsRef.current.onclose = (event) => {
          console.log(
            t('webrtc.lostConnection'),
            event.code,
            event.reason
          );
          clearTimeout(connectionTimeout);
          setConnectionState("disconnected");

          if (status !== "idle" && status !== "shared") {
            // Only show error if we were expecting to stay connected
            if (event.code !== 1000) {
              // 1000 is normal closure
              setStatus("error");
              setErrorMessage(t('webrtc.lostConnection'));
            }
          }
        };

        wsRef.current.onerror = (error) => {
          console.error("WebSocket error:", error);
          clearTimeout(connectionTimeout);
          setConnectionState("disconnected");
          setStatus("error");
          setErrorMessage(
            t('webrtc.failedToConnect')
          );
          reject(error);
        };
      } catch (error) {
        setConnectionState("disconnected");
        setStatus("error");
        setErrorMessage(t('webrtc.failedToConnect'));
        reject(error);
      }
    });
  };

  const sendMessage = (message) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
      return true;
    } else {
      console.warn(
        "Attempted to send message but WebSocket is not open:",
        wsRef.current?.readyState
      );
      return false;
    }
  };

  const handleSignalingMessage = async (message) => {
    console.log("Received signaling message:", message.type);

    switch (message.type) {
      case "connected":
        console.log(
          "Server confirmed connection with client ID:",
          message.clientId
        );
        break;

      case "room-created":
        console.log("Room created:", message.roomId);
        setStatus("hosting");
        setRoomId(message.roomId);
        break;

      case "room-joined":
        console.log("Room joined:", message.roomId);
        setStatus("connected");
        break;

      case "peers-list":
        console.log("Peers list received:", message.peers);
        setNearbyPeers(message.peers);
        break;

      case "peer-joined":
        console.log("Peer joined:", message.peer);
        setNearbyPeers((prev) => [...prev, message.peer]);
        break;

      case "peer-left":
        console.log("Peer left:", message.peerId);
        setNearbyPeers((prev) => prev.filter((p) => p.id !== message.peerId));
        break;

      case "offer":
        await handleReceiveOffer(message.offer, message.from);
        break;

      case "answer":
        await handleReceiveAnswer(message.answer);
        break;

      case "ice-candidate":
        await handleReceiveIceCandidate(message.candidate);
        break;

      case "error":
        console.error("Server error:", message.message);
        setStatus("error");
        setErrorMessage(message.message);
        break;

      case "pong":
        // Server responded to ping
        break;

      default:
        console.log("Unknown message type:", message.type);
    }
  };

  // WebRTC peer connection functions
  const createPeerConnection = () => {
    const pc = new RTCPeerConnection(rtcConfig);

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        sendMessage({
          type: "ice-candidate",
          candidate: event.candidate,
          roomId: roomId,
        });
      }
    };

    pc.onconnectionstatechange = () => {
      console.log("Connection state:", pc.connectionState);
      if (pc.connectionState === "connected") {
        setStatus("connected");
      } else if (
        pc.connectionState === "failed" ||
        pc.connectionState === "disconnected"
      ) {
        setStatus("error");
        setErrorMessage("P2P connection failed");
      }
    };

    return pc;
  };

  // Room management functions with proper connection handling
  const startHosting = async () => {
    try {
      const newRoomId = generateRoomId();
      setRoomId(newRoomId);
      setIsHost(true);
      setStatus("connecting"); // FIX: Wait for server confirmation
      setErrorMessage("");

      console.log("Starting to host room:", newRoomId);

      const ws = await connectToSignalingServer();

      // Send create room message
      const success = sendMessage({
        type: "create-room",
        roomId: newRoomId,
      });

      if (!success) {
        throw new Error(t('settings.failedToConnect'));
      }
    } catch (error) {
      console.error("Error starting host:", error);
      setStatus("error");
      setErrorMessage(t('settings.failedToConnect'));
    }
  };

  const joinRoom = async (inputRoomId) => {
    try {
      if (!inputRoomId?.trim()) {
        setErrorMessage(t('webrtc.enterRoomId'));
        return;
      }

      setRoomId(inputRoomId);
      setIsClient(true);
      setStatus("connecting");
      setErrorMessage("");

      console.log("Attempting to join room:", inputRoomId);

      const ws = await connectToSignalingServer();

      // Send join room message
      const success = sendMessage({
        type: "join-room",
        roomId: inputRoomId,
      });

      if (!success) {
        throw new Error(t('settings.failedToConnect'));
      }
    } catch (error) {
      console.error("Error joining room:", error);
      setStatus("error");
      setErrorMessage(t('settings.failedToConnect'));
    }
  };

  // Data sharing functions
  const sendDataToPeer = async (peerId) => {
    try {
      console.log("Sending data to peer:", peerId);
      const pc = createPeerConnection();
      peerConnectionRef.current = pc;

      // Create data channel
      const dataChannel = pc.createDataChannel("todoData", {
        ordered: true,
      });

      dataChannel.onopen = () => {
        console.log("Data channel opened, sending data");
        const todoData = {
          dailyTasks,
          customTags,
          habits,
          darkMode,
          theme,
          exportDate: new Date().toISOString(),
          version: "3.0",
        };
        dataChannel.send(JSON.stringify(todoData));
        setStatus("shared");

        // Close modal after successful data send (Host side)
        setTimeout(() => {
          onClose();
        }, 1500);
      };

      dataChannel.onerror = (error) => {
        console.error("Data channel error:", error);
        setStatus("error");
        setErrorMessage(t('webrtc.failedToConnect'));
      };

      dataChannelRef.current = dataChannel;

      // Create offer
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      sendMessage({
        type: "offer",
        offer: offer,
        roomId: roomId,
        to: peerId,
      });
    } catch (error) {
      console.error("Error sending data:", error);
      setStatus("error");
      setErrorMessage(t('settings.failedToConnect'));
    }
  };

  // WebRTC message handlers
  const handleReceiveOffer = async (offer, from) => {
    try {
      console.log("Handling offer from:", from);
      const pc = createPeerConnection();
      peerConnectionRef.current = pc;

      pc.ondatachannel = (event) => {
        const dataChannel = event.channel;
        dataChannel.onmessage = (event) => {
          try {
            console.log("Received data from peer");
            const receivedTodoData = JSON.parse(event.data);
            setReceivedData(receivedTodoData);
            // On client side, when data is received, reset status to 'idle' to hide connected section
            setStatus("idle");
            setIsClient(false);
            setIsHost(false);
          } catch (error) {
            console.error("Error parsing received data:", error);
          }
        };
      };

      await pc.setRemoteDescription(offer);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      sendMessage({
        type: "answer",
        answer: answer,
        roomId: roomId,
        to: from,
      });
    } catch (error) {
      console.error("Error handling offer:", error);
      setStatus("error");
        setErrorMessage(t('webrtc.p2pFailed'));
    }
  };

  const handleReceiveAnswer = async (answer) => {
    try {
      if (peerConnectionRef.current) {
        await peerConnectionRef.current.setRemoteDescription(answer);
      }
    } catch (error) {
      console.error("Error handling answer:", error);
    }
  };

  const handleReceiveIceCandidate = async (candidate) => {
    try {
      if (peerConnectionRef.current) {
        await peerConnectionRef.current.addIceCandidate(candidate);
      }
    } catch (error) {
      console.error("Error handling ICE candidate:", error);
    }
  };

  // Data import function
  const importReceivedData = () => {
    if (receivedData && onImportData) {
      onImportData(receivedData);
      // Auto-close modal immediately after importing data
      onClose();
    }
  };

  // Cleanup functions
  const resetState = () => {
    console.log("Resetting state");
    setIsHost(false);
    setIsClient(false);
    setRoomId("");
    setStatus("idle");
    setNearbyPeers([]);
    setSelectedPeer(null);
    setReceivedData(null);
    setShowReceivedData(false);
    setErrorMessage("");
    setCopySuccess(false);
    setConnectionState("disconnected");
    pendingActionRef.current = null;

    if (dataChannelRef.current) {
      dataChannelRef.current.close();
      dataChannelRef.current = null;
    }

    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      // Send leave room message before closing
      wsRef.current.send(JSON.stringify({ type: "leave-room" }));
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  // Connection health check
  useEffect(() => {
    let pingInterval;

    if (connectionState === "connected") {
      pingInterval = setInterval(() => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          sendMessage({ type: "ping" });
        }
      }, 30000); // Ping every 30 seconds
    }

    return () => {
      if (pingInterval) {
        clearInterval(pingInterval);
      }
    };
  }, [connectionState]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      resetState();
    };
  }, []);

  // Handle Enter key for joining room
  const handleRoomIdKeyPress = (e) => {
    if (e.key === "Enter" && roomId.trim()) {
      joinRoom(roomId);
    }
  };

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  };

  const modalVariants = {
    hidden: { y: "100%", opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.4,
      },
    },
    exit: {
      y: "100%",
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        variants={modalVariants}
        className="bg-white dark:bg-gray-900 rounded-t-3xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl border-t border-gray-200 dark:border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag Handle */}
        <motion.div
          className="flex justify-center pt-4 pb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div
            className="w-12 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full cursor-pointer"
            onClick={onClose}
          />
        </motion.div>

        <div className="px-6 pb-6 overflow-y-auto max-h-[calc(90vh-70px)]">
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between mb-6"
          >
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ rotate: -10, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                  delay: 0.25,
                  type: "spring",
                  stiffness: 300,
                }}
                className="p-2.5 bg-primary/10 rounded-xl"
              >
                <Share className="h-5 w-5 text-primary" />
              </motion.div>
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 tracking-wide">
                {t('webrtc.syncTasks')}
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl p-2 dark:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </motion.div>

          {/* Server Configuration */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="flex items-center justify-between">
              <label className="text-sm font-extrabold text-gray-700 dark:text-gray-200 uppercase tracking-wider flex items-center gap-2">
                <Server className="h-4 w-4" />
                {t('webrtc.serverUrl')}
              </label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowServerConfig(!showServerConfig)}
                className="p-2"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>

            <AnimatePresence>
              {showServerConfig && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3"
                >
                  <Input
                    value={serverUrl}
                    onChange={(e) => setServerUrl(e.target.value)}
                    placeholder="wss://api.prio.space"
                    className="border-2 border-gray-300 font-medium focus:border-primary/70 dark:border-gray-600 dark:focus:border-primary/80 dark:text-gray-100 rounded-xl bg-white dark:bg-gray-800 py-3"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">
                    {t('webrtc.enterSignalingServerUrl')}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Status Display - Only show when not idle and no received data */}
          {status !== "idle" && !receivedData && (
            <motion.div
              variants={itemVariants}
              className="mb-6 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80"
            >
              <div className="flex items-center gap-3">
                {status === "hosting" && (
                  <Wifi className="h-5 w-5 text-green-500 animate-pulse" />
                )}
                {status === "connecting" && (
                  <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />
                )}
                {status === "connected" && (
                  <Check className="h-5 w-5 text-green-500" />
                )}
                {status === "shared" && (
                  <Check className="h-5 w-5 text-green-500" />
                )}
                {status === "error" && (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}

                <div className="flex-1">
                  <div className="font-extrabold text-gray-900 dark:text-gray-100">
                    {status === "hosting" && `Hosting Room: ${roomId}`}
                    {status === "connecting" && t('webrtc.waitingForUsers')}
                    {status === "connected" && t('webrtc.connectedUsers')}
                    {status === "shared" && t('webrtc.dataReceived')}
                    {status === "error" && t('webrtc.connectionError')}
                  </div>
                  {errorMessage && (
                    <div className="text-sm text-red-500 font-medium">
                      {errorMessage}
                    </div>
                  )}
                </div>

                {/* Copy button for room ID when hosting */}
                {status === "hosting" && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={copyRoomId}
                      size="sm"
                      variant="outline"
                      className="border-2 border-gray-300 dark:border-gray-600 hover:border-primary/70 dark:hover:border-primary/80 rounded-xl font-extrabold"
                    >
                      {copySuccess ? (
                        <>
                          <Check className="h-4 w-4 mr-1" />
                          {t('webrtc.copied')}
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-1" />
                          {t('webrtc.copy')}
                        </>
                      )}
                    </Button>
                  </motion.div>
                )}

                {/* Close button when shared */}
                {status === "shared" && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={onClose}
                      size="sm"
                      className="bg-primary hover:bg-primary/90 rounded-xl font-extrabold"
                    >
{t('webrtc.close')}
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Received Data Display */}
          {receivedData && (
            <motion.div
              variants={itemVariants}
              className="mb-6 p-4 rounded-xl border-2 border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-800/20"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-green-600" />
                  <span className="font-extrabold text-green-700 dark:text-green-300">
                    {t('webrtc.dataReceived')}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowReceivedData(!showReceivedData)}
                  className="p-1"
                >
                  {showReceivedData ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <AnimatePresence>
                {showReceivedData && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-sm text-green-600 dark:text-green-400 mb-3 font-mono bg-white dark:bg-gray-800 p-3 rounded-xl border border-green-200 dark:border-green-700 max-h-32 overflow-y-auto"
                  >
                    <div>
                      {t('webrtc.tasks')}: {Object.keys(receivedData.dailyTasks || {}).length}{" "}
                      days
                    </div>
                    <div>
                      {t('webrtc.customTags')}: {(receivedData.customTags || []).length}
                    </div>
                    <div>{t('webrtc.habits')}: {(receivedData.habits || []).length}</div>
                    <div>{t('webrtc.theme')}: {receivedData.theme || "default"}</div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Button
                  onClick={importReceivedData}
                  className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl font-extrabold py-3"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {t('webrtc.importThisData')}
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* Main Content */}
          {status === "idle" && !receivedData && (
            <motion.div variants={contentVariants} className="space-y-4">
              {/* Host Option */}
              <motion.div variants={itemVariants}>
                <div className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
                  <div className="flex items-center gap-3">
                    <Wifi className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-extrabold text-gray-900 dark:text-gray-100">
                        {t('webrtc.hostRoom')}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        {t('webrtc.shareTasks')}
                      </div>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={startHosting}
                      variant="outline"
                      size="sm"
                      className="border-2 border-gray-300 dark:border-gray-600 hover:border-primary/70 dark:hover:border-primary/80 rounded-xl font-extrabold w-12 h-12 p-0"
                    >
                      <Wifi className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>

              {/* Divider */}
              <motion.div
                variants={itemVariants}
                className="text-center text-gray-500 dark:text-gray-400 font-extrabold uppercase tracking-wider text-sm"
              >
                {t('webrtc.or')}
              </motion.div>

              {/* Join Option */}
              <motion.div variants={itemVariants} className="space-y-3">
                <label className="text-sm font-extrabold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                  {t('webrtc.joinRoom')}
                </label>

                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder={t('webrtc.enterRoomId')}
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                    className="flex-1 border-2 border-gray-300 font-medium focus:border-primary/70 dark:border-gray-600 dark:focus:border-primary/80 dark:text-gray-100 rounded-xl bg-white dark:bg-gray-800 py-3"
                  />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => joinRoom(roomId)}
                      disabled={!roomId.trim()}
                      className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-extrabold"
                    >
                      <Users className="h-5 w-5" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Hosting View */}
          {status === "hosting" && (
            <motion.div variants={contentVariants} className="space-y-4">
              <motion.div
                variants={itemVariants}
                className="text-center p-6 rounded-xl bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700"
              >
                <div className="text-3xl font-extrabold text-blue-700 dark:text-blue-300 mb-2 tracking-wider">
                  {roomId}
                </div>
                <div className="text-sm text-blue-600 dark:text-blue-400 font-extrabold uppercase tracking-wider">
                  {t('webrtc.shareRoomId')}
                </div>
              </motion.div>

              {nearbyPeers.length > 0 && (
                <motion.div variants={itemVariants}>
                  <h3 className="font-extrabold text-gray-900 dark:text-gray-100 mb-3 text-lg">
                    {t('webrtc.connectedUsers')} ({nearbyPeers.length})
                  </h3>
                  <div className="space-y-3">
                    {nearbyPeers.map((peer) => (
                      <motion.div
                        key={peer.id}
                        variants={itemVariants}
                        className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80"
                      >
                        <div className="flex items-center gap-3">
                          <Users className="h-5 w-5 text-primary" />
                          <span className="font-extrabold text-gray-900 dark:text-gray-100">
                            {t('webrtc.user')} {peer.id.slice(-4)}
                          </span>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            onClick={() => sendDataToPeer(peer.id)}
                            size="sm"
                            className="bg-primary hover:bg-primary/90 rounded-xl font-extrabold"
                          >
                            <Share className="h-4 w-4 mr-1" />
                            {t('common.send')}
                          </Button>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              <motion.div
                variants={itemVariants}
                className="text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border-2 border-dashed border-gray-300 dark:border-gray-600"
              >
                <div className="text-gray-500 dark:text-gray-400 font-extrabold text-sm uppercase tracking-wider">
                  {t('webrtc.waitingForUsers')}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Reset Button - Only show when status is not idle and no received data */}
          {status !== "idle" && status !== "shared" && !receivedData && (
            <motion.div
              variants={itemVariants}
              className="mt-6 pt-4 border-t-2 border-gray-200 dark:border-gray-700"
            >
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Button
                  onClick={resetState}
                  variant="outline"
                  className="w-full border-2 border-gray-300 dark:border-gray-600 hover:border-primary/70 dark:hover:border-primary/80 rounded-xl font-extrabold py-3"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  {t('webrtc.startOver')}
                </Button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
