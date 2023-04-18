import React, { Component, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { MotiView } from "@motify/components";
import * as FileSystem from "expo-file-system";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from "react-native";
import { Easing } from "react-native-reanimated";
import { Audio } from "expo-av";
import { getSpeech2Text } from "../api/speech2text";
import { getFileData } from "../utils/getFileBlob";
import {
  AndroidAudioEncoder,
  AndroidOutputFormat,
  IOSAudioQuality,
  IOSOutputFormat,
} from "expo-av/build/Audio";
import { Button } from "@rneui/base";

interface IProps {
  onSpeechStart: () => void;
  onSpeechEnd: (result: any[]) => void;
}
type State = {
  recognized: string;
  pitch: string;
  error: string;
  end: string;
  started: boolean;
  results: string[];
  partialResults: string[];
};

const VoiceComp: React.FC<IProps> = (props) => {
  const [started, setStarted] = useState(false);
  const [isFetching, setIsFetching] = useState(false); // 正在将音频传输并等待响应
  const [recording, setRecording] = useState<Audio.Recording>();

  // // 删除音频文件
  // const deleteRecordingFile = async () => {
  //   try {
  //     if (recording !== undefined) {
  //       const info = await FileSystem.getInfoAsync(recording.getURI()!);
  //       await FileSystem.deleteAsync(info.uri);
  //     }
  //   } catch (error) {
  //     console.log("There was an error deleting recording file", error);
  //   }
  // };

  // const startRecording = async () => {
  //   setStarted(true);
  //   await Audio.requestPermissionsAsync();
  //   await Audio.setAudioModeAsync({
  //     playThroughEarpieceAndroid: true,
  //   });

  //   console.log("Starting recording..");
  //   const { recording } = await Audio.Recording.createAsync({
  //     android: {
  //       extension: ".wav",
  //       outputFormat: AndroidOutputFormat.MPEG_4,
  //       audioEncoder: AndroidAudioEncoder.AAC,
  //       sampleRate: 44100,
  //       numberOfChannels: 1,
  //       bitRate: 128000,
  //     },
  //     ios: {
  //       extension: ".m4a",
  //       outputFormat: IOSOutputFormat.MPEG4AAC,
  //       audioQuality: IOSAudioQuality.MAX,
  //       sampleRate: 44100,
  //       numberOfChannels: 2,
  //       bitRate: 128000,
  //       linearPCMBitDepth: 16,
  //       linearPCMIsBigEndian: false,
  //       linearPCMIsFloat: false,
  //     },
  //     web: {
  //       mimeType: "audio/webm",
  //       bitsPerSecond: 128000,
  //     },
  //   });
  //   AndroidOutputFormat;
  //   AndroidAudioEncoder;
  //   setRecording(recording);
  // };

  // const stopRecording = async () => {
  //   if (recording) {
  //     await recording.stopAndUnloadAsync();
  //   }
  //   setStarted(false);
  // };

  const getTranscription = async () => {
    setIsFetching(true);
    try {
      const info = await FileSystem.getInfoAsync(recording!.getURI()!);
      console.log(`FILE INFO: ${JSON.stringify(info)}`);
      const bufferData = await getFileData(info.uri);

      const res = await getSpeech2Text(bufferData, bufferData.length);
      console.log(res);
      // const videoFile = await fetch(uri, {
      //   headers: {
      //     "Content-Type": "audio/mp4",
      //   },
      // });

      // console.log("videoFile", videoFile);
      // const videoFileBlob = await videoFile.blob();
      // console.log("videoFileBlob", videoFileBlob);
      // const data = await getSpeech2Text(videoFileBlob);
      // console.log("这里是结果", data);
      // const formData = new FormData();
      // formData.append("file", videoFileBlob);

      // console.log("这里是结果", data);
    } catch (error) {
      console.log("There was an error reading file", error);
      stopRecording();
    } finally {
      // resetRecording();
    }
    setIsFetching(false);
  };

  // const resetRecording = () => {
  //   deleteRecordingFile();
  //   setRecording(undefined);
  // };

  // // 长按开始录音
  // const handleStartRecoding = async () => {
  //   await startRecording();
  // };

  // // 停止录音或录音已经结束
  // const handleStopRecording = async () => {
  //   await stopRecording();
  //   await getTranscription();
  // };

  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync({
        android: {
          extension: ".wav",
          outputFormat: AndroidOutputFormat.MPEG_4,
          audioEncoder: AndroidAudioEncoder.AAC,
          sampleRate: 44100,
          numberOfChannels: 1,
          bitRate: 128000,
        },
        ios: {
          extension: ".m4a",
          outputFormat: IOSOutputFormat.MPEG4AAC,
          audioQuality: IOSAudioQuality.MAX,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
        web: {
          mimeType: "audio/webm",
          bitsPerSecond: 128000,
        },
      });
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    // setRecording(undefined);
    await recording?.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording?.getURI();
    console.log("Recording stopped and stored at", uri);

    await getTranscription();
  }

  return (
    <View style={styles.container}>
      {/* {started ? (
        <TouchableHighlight onPress={handleStopRecording}>
          <View
            style={{
              width: 75,
              height: 75,
              borderRadius: 75,
              backgroundColor: "#6E01EF",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {[...Array(3).keys()].map((index) => {
              return (
                <MotiView
                  from={{ opacity: 1, scale: 1 }}
                  animate={{ opacity: 0, scale: 4 }}
                  transition={{
                    type: "timing",
                    duration: 2000,
                    easing: Easing.out(Easing.ease),
                    delay: index * 200,
                    repeatReverse: false,
                    loop: true,
                  }}
                  key={index}
                  style={[
                    StyleSheet.absoluteFillObject,
                    { backgroundColor: "#6E01EF", borderRadius: 75 },
                  ]}
                />
              );
            })}
            <FontAwesome name='microphone-slash' size={24} color='#fff' />
          </View>
        </TouchableHighlight>
      ) : (
        <TouchableHighlight onPress={handleStartRecoding}>
          <View
            style={{
              width: 75,
              height: 75,
              borderRadius: 75,
              backgroundColor: "#6E01EF",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome name='microphone' size={24} color='#fff' />
          </View>
        </TouchableHighlight>
      )} */}
      <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={recording ? stopRecording : startRecording}
      />
    </View>
  );
};

// state = {
//   recognized: "",
//   pitch: "",
//   error: "",
//   end: "",
//   started: false,
//   results: [],
//   partialResults: [],
// };

// class VoiceComp1 extends Component<Props, State> {
//   state = {
//     recognized: "",
//     pitch: "",
//     error: "",
//     end: "",
//     started: false,
//     results: [],
//     partialResults: [],
//   };

//   constructor(props: Props) {
//     super(props);
//     Voice.onSpeechStart = this.onSpeechStart;
//     Voice.onSpeechRecognized = this.onSpeechRecognized;
//     Voice.onSpeechEnd = this.onSpeechEnd;
//     Voice.onSpeechError = this.onSpeechError;
//     Voice.onSpeechResults = this.onSpeechResults;
//     Voice.onSpeechPartialResults = this.onSpeechPartialResults;
//     Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
//   }

//   componentWillUnmount() {
//     Voice.destroy().then(Voice.removeAllListeners);
//   }

//   onSpeechStart = (e: any) => {
//     console.log("onSpeechStart: ", e);
//     this.setState({
//       started: true,
//     });
//   };

//   onSpeechRecognized = (e: SpeechRecognizedEvent) => {
//     console.log("onSpeechRecognized: ", e);
//     this.setState({
//       recognized: "√",
//     });
//   };

//   onSpeechEnd = (e: any) => {
//     console.log("onSpeechEnd: ", e);
//     this.setState({
//       end: "√",
//       started: false,
//     });

//     this.props.onSpeechEnd(this.state.results);
//   };

//   onSpeechError = (e: SpeechErrorEvent) => {
//     console.log("onSpeechError: ", e);
//     this.setState({
//       error: JSON.stringify(e.error),
//     });
//   };

//   onSpeechResults = (e: SpeechResultsEvent) => {
//     console.log("onSpeechResults: ", e);
//     this.setState({
//       results: e.value!,
//     });
//   };

//   onSpeechPartialResults = (e: SpeechResultsEvent) => {
//     console.log("onSpeechPartialResults: ", e);
//     this.setState({
//       partialResults: e.value!,
//     });
//   };

//   onSpeechVolumeChanged = (e: any) => {
//     console.log("onSpeechVolumeChanged: ", e);
//     this.setState({
//       pitch: e.value,
//     });
//   };

//   _startRecognizing = async () => {
//     this.setState({
//       recognized: "",
//       pitch: "",
//       error: "",
//       started: false,
//       results: [],
//       partialResults: [],
//       end: "",
//     });

//     try {
//       await Voice.start("en-US");

//       this.props.onSpeechStart();
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   _stopRecognizing = async () => {
//     try {
//       await Voice.stop();
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   _cancelRecognizing = async () => {
//     try {
//       await Voice.cancel();
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   _destroyRecognizer = async () => {
//     try {
//       await Voice.destroy();
//     } catch (e) {
//       console.error(e);
//     }
//     this.setState({
//       recognized: "",
//       pitch: "",
//       error: "",
//       started: false,
//       results: [],
//       partialResults: [],
//       end: "",
//     });
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         {this.state.started ? (
//           <TouchableHighlight onPress={this._stopRecognizing}>
//             <View
//               style={{
//                 width: 75,
//                 height: 75,
//                 borderRadius: 75,
//                 backgroundColor: "#6E01EF",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//               // onPress={this._startRecognizing}
//             >
//               {[...Array(3).keys()].map((index) => {
//                 return (
//                   <MotiView
//                     from={{ opacity: 1, scale: 1 }}
//                     animate={{ opacity: 0, scale: 4 }}
//                     transition={{
//                       type: "timing",
//                       duration: 2000,
//                       easing: Easing.out(Easing.ease),
//                       delay: index * 200,
//                       repeatReverse: false,
//                       loop: true,
//                     }}
//                     key={index}
//                     style={[
//                       StyleSheet.absoluteFillObject,
//                       { backgroundColor: "#6E01EF", borderRadius: 75 },
//                     ]}
//                   />
//                 );
//               })}
//               <FontAwesome name='microphone-slash' size={24} color='#fff' />
//             </View>
//           </TouchableHighlight>
//         ) : (
//           <TouchableHighlight onLongPress={this._startRecognizing}>
//             <View
//               style={{
//                 width: 75,
//                 height: 75,
//                 borderRadius: 75,
//                 backgroundColor: "#6E01EF",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <FontAwesome name='microphone' size={24} color='#fff' />
//             </View>
//           </TouchableHighlight>
//         )}
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  container: {},
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  action: {
    textAlign: "center",
    color: "#0000FF",
    marginVertical: 5,
    fontWeight: "bold",
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  stat: {
    textAlign: "center",
    color: "#B0171F",
    marginBottom: 1,
  },
});

export default VoiceComp;
