


```

npm install -g create-nuxt-app # 導入


ymatsu:15:30:12 ~/test_vue $which create-nuxt-app # 導入されているか確認
/usr/local/bin/create-nuxt-app


＃ プロジェクト作成

ymatsu:15:51:25 ~/test_vue $create-nuxt-app iot-camera-spa-vue
> Generating Nuxt.js project in /Users/ymatsu/test_vue/iot-camera-spa-vue
? Project name iot-camera-spa-vue
? Project description My exquisite Nuxt.js project
? Use a custom server framework none
? Use a custom UI framework element-ui
? Choose rendering mode Single Page App
? Use axios module yes
? Use eslint no
? Use prettier no
? Author name Yoshimasa MATSUMOTO
? Choose a package manager yarn
Initialized empty Git repository in /Users/ymatsu/test_vue/iot-camera-spa-vue/.git/
yarn install v1.9.4
info No lockfile found.
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[------------------------------------------------------------------------------------------------------------------------------] 0/926(node:353) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.
[3/4] 🔗  Linking dependencies...
warning " > element-ui@2.4.11" has unmet peer dependency "vue@^2.5.2".
[4/4] 📃  Building fresh packages...
success Saved lockfile.
warning Your current version of Yarn is out of date. The latest version is "1.13.0", while you're on "1.9.4".
info To upgrade, run the following command:
$ brew upgrade yarn
✨  Done in 37.09s.

  To get started:

    cd iot-camera-spa-vue
    yarn run dev

  To build & start for production:

    cd iot-camera-spa-vue
    yarn run build
    yarn start

ymatsu:15:53:43 ~/test_vue $
```
