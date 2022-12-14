import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useEffect } from 'react'
import axios from 'axios'
export default function Home() {
  const memberId = 'member001';

  class ChannelService {
    constructor() {
      this.loadScript();
    }

    loadScript() {

      var w = window;
      if (w.ChannelIO) {
        return (window.console.error || window.console.log || function () { })('ChannelIO script included twice.');
      }
      var ch = function () {
        ch.c(arguments);
      };
      ch.q = [];
      ch.c = function (args) {
        ch.q.push(args);
      };
      w.ChannelIO = ch;
      function l() {
        if (w.ChannelIOInitialized) {
          return;
        }
        w.ChannelIOInitialized = true;
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
        s.charset = 'UTF-8';
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
      }
      if (document.readyState === 'complete') {
        console.log("document.readyState === 'complete'");
        l();
      } else if (window.attachEvent) {
        console.log("window.attachEvent");
        window.attachEvent('onload', l);
      } else {
        console.log("DOMContentLoaded");
        window.addEventListener('DOMContentLoaded', l, false);
        window.addEventListener('load', l, false);
      }
    }

    boot(settings) {
      window.ChannelIO('boot', settings, async function onBoot(error, user) {
        if (error) {
          console.log({ error })
          // window.ReactNativeWebView.postMessage(JSON.stringify(error));
        } else {
          // console.log({ user })
          // window.ReactNativeWebView.postMessage(JSON.stringify(user));
          window.ChannelIO('openChat', "638acaf83cb3e2626730", '');
          // window.ChannelIO('openChat', "6390b563346c31563866", '');
          setTimeout(() => {
            let iframedoc = document.getElementsByTagName("iframe")['ch-plugin-script-iframe'].contentDocument.getElementsByTagName("svg");
            iframedoc[0]?.setAttribute('display', 'none')
            iframedoc[1]?.setAttribute('display', 'none')
            iframedoc[2]?.setAttribute('display', 'none')
            // document.getElementsByTagName("iframe")['ch-plugin-script-iframe'].contentDocument.getElementByClassName("Layoutstyled__MobileAppLayout-ch-front__sc-19rvneg-2 kGtLCD").setAttribute('padding-top', 0)

          }, 1200);
        }
      });

    }

    shutdown() {
      window.ChannelIO('shutdown');
    }
  }

  useEffect(() => {
    async function getDetailChatBot() {
      try {
        const myDataUser = await axios({
          method: 'GET',
          url: `https://api.channel.io/open/v5/users/@${memberId}`,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-Access-Key': '638024635c899333cde9',
            'X-Access-Secret': '7006056e109b1070231e2c5544159239',
          },
        });
        const idUser = await myDataUser;
        console.log('idUser', idUser.data.user.id);
        if (idUser) {
          const responseDataUserChat = await axios({
            method: 'GET',
            url: `https://api.channel.io/open/v5/users/${idUser.data.user.id}/user-chats`,
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              'X-Access-Key': '638024635c899333cde9',
              'X-Access-Secret': '7006056e109b1070231e2c5544159239',
            },
          });
          console.log(
            'responseDataUserChat',
            JSON.stringify(responseDataUserChat.data.messages),
          );
          if (responseDataUserChat.data.messages.length > 0) {
            console.log('data', responseDataUserChat.data.messages[0].chatId);
            // setUrl(
            //   `https://ljywn.channel.io/user-chats/${responseDataUserChat.data.messages[0].chatId}?mode=newTab&translate=true`,
            // );
            // location.replace(`https://ljywn.channel.io/user-chats/${idUserChat[0].id}?mode=newTab&translate=true`)
            // document.getElementsByTagName("svg")[0].setAttribute('display', 'none')
          }
        }
      } catch (error) {
        console.log('error', error);
      }
    }
    setTimeout(() => {
      getDetailChatBot();
    }, 100);




    // 
    const channelService = new ChannelService();
    channelService.boot({
      "pluginKey": "d45e05be-644b-452e-bd07-e051299d51bd",
      "openChatDirectlyAsPossible": true, //please fill with your plugin key
      "mobileMessengerMode": "iframe",
      "memberId": "member001", //member001
      "memberHash": "4af89f3dc98067af39828e7c62637f946c434bd0849fc6fae21e8406ea8be071",//
      // "memberId": "member002", //member001
      // "memberHash": "05ca1aeb4265fe79efe65c802f49bd962bedd211ce27592ea3b2288698548c07",//
      // "memberId": "member0012", //member001
      // "memberHash": "e6fec9db057c87ec37900656cd04a276da68b81e4bf8fec6bea587ec91a2f11d",//
      "profile": {
        // "name": USER_NAME,
        // "mobileNumber": "01012345678"
      }
    });
  }, [])
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 id="header">Waiting get info user...</h1>
      </main>

    </div>
  )
}
