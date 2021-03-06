import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useChatClient } from './useChatClient';

import {
  Chat,
  OverlayProvider,
  ChannelList,
  Channel,
  MesseageList,
  MessageInput,
} from 'stream-chat-react-native';

import { StreamChat } from 'stream-chat';
import { chatApiKey, chatUserId } from './chatConfig';

const filters = {
  members : {
    '$in' : [chatUserId]
  },
};

const sort = {
  last_message_at : -1,
};

const Stack = createStackNavigator();
const HomeScreen = () => <Text>Home Screen</Text>;

const ChannelScreen = props => {
  const { route } = props;
  const { params : { channel } } = route;

  return null;
  return (
    <Channel channel={channel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
};

const ChannelListScreen = props => {
  return (
    <ChannelList
      onSelect = {(channel) => {
        const { navigation } = props;
        navigation.navigate('ChannelScreen', {channel});
      }}
    />
  );
};

const chatClient = StreamChat.getInstance(chatApiKey);

const NavigationStack = () => {
  const { clientIsReady } = useChatClient();

  if(!clientIsReady) {
    return <Text>Loading chat ...</Text>
  }

  return (
    <OverlayProvider>
      <Chat client={chatClient}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ChannelList" component={ChannelListScreen} />
          <Stack.Screen name="ChannelScreen" component={ChannelScreen} />
        </Stack.Navigator>
      </Chat>
    </OverlayProvider>
  )
}

export default () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        ...
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
