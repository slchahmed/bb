import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.projet.suivi',
  appName: 'mobile_dash',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins:{
   LocalNotifications:{
    smallIcon:'ic_stat_checkbox',
    iconColor:'#3661EC',
   }
  }
};

export default config;
