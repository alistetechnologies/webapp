import toast from "react-hot-toast";
import { serverUrl } from "./config";
import axios from "axios";

const images = import.meta.glob('../../assests/ir/*.png', { eager: true });

export const RemoteButtons = {
    NONE: {
      value: -1,
      label: '',
      image: images['../../assests/ir/plus.png']?.default,
      tintColor: 'grey',
    },
    OTHER: {value: 0, label: 'Other', image: null, tintColor: undefined},
    alexa: {
      value: 1,
      label: 'Alexa',
      image: images['../../assests/ir/alexa.png']?.default,
      tintColor: undefined,
    },
    blue: {
      value: 2,
      label: 'Blue',
      image: images['../../assests/ir/blue.png']?.default,
      tintColor: undefined,
    },
    circle: {
      value: 3,
      label: 'Circle',
      image: images['../../assests/ir/circle.png']?.default,
      tintColor: 'white',
    },
    down: {
      value: 4,
      label: 'Down',
      image: images['../../assests/ir/down.png']?.default,
      tintColor: 'white',
    },
    eight: {
      value: 5,
      label: 'Eight',
      image: images['../../assests/ir/eight.png']?.default,
      tintColor: 'white',
    },
    fan: {
      value: 6,
      label: 'Fan',
      image: images['../../assests/ir/fan.png']?.default,
      tintColor: 'white',
    },
    fastforward: {
      value: 7,
      label: 'Fast Forward',
      image: images['../../assests/ir/fastforward.png']?.default,
      tintColor: 'white',
    },
    five: {
      value: 8,
      label: 'Five',
      image: images['../../assests/ir/five.png']?.default,
      tintColor: 'white',
    },
    four: {
      value: 9,
      label: 'Four',
      image: images['../../assests/ir/four.png']?.default,
      tintColor: 'white',
    },
    gnow: {
      value: 10,
      label: 'Google Asst.',
      image: images['../../assests/ir/gnow.png']?.default,
      tintColor: undefined,
    },
    green: {
      value: 11,
      label: 'Green',
      image: images['../../assests/ir/green.png']?.default,
      tintColor: undefined,
    },
    home: {
      value: 12,
      label: 'Home',
      image: images['../../assests/ir/home.png']?.default,
      tintColor: 'white',
    },
    hotstar: {
      value: 13,
      label: 'Hotstar',
      image: images['../../assests/ir/hotstar.png']?.default,
      tintColor: undefined,
    },
    left: {
      value: 14,
      label: 'Left',
      image: images['../../assests/ir/left.png']?.default,
      tintColor: 'white',
    },
    menu: {
      value: 15,
      label: 'Menu',
      image: images['../../assests/ir/menu.png']?.default,
      tintColor: 'white',
    },
    minus: {
      value: 16,
      label: 'Minus',
      image: images['../../assests/ir/minus.png']?.default,
      tintColor: 'white',
    },
    mute: {
      value: 17,
      label: 'Mute',
      image: images['../../assests/ir/mute.png']?.default,
      tintColor: 'white',
    },
    netflix: {
      value: 18,
      label: 'Netflix',
      image: images['../../assests/ir/netflix.png']?.default,
      tintColor: undefined,
    },
    nine: {
      value: 19,
      label: 'Nine',
      image: images['../../assests/ir/nine.png']?.default,
      tintColor: 'white',
    },
    one: {
      value: 20,
      label: 'One',
      image: images['../../assests/ir/one.png']?.default,
      tintColor: 'white',
    },
    playpause: {
      value: 21,
      label: 'Play Pause',
      image: images['../../assests/ir/playpause.png']?.default,
      tintColor: 'white',
    },
    plus: {
      value: 22,
      label: 'Plus',
      image: images['../../assests/ir/plus.png']?.default,
      tintColor: 'white',
    },
    power: {
      value: 23,
      label: 'Power',
      image: images['../../assests/ir/power.png']?.default,
      tintColor: 'white',
    },
    power_on: {
      value: 24,
      label: 'Power On',
      image: images['../../assests/ir/power.png']?.default,
      tintColor: 'white',
    },
    power_off: {
      value: 25,
      label: 'Power Off',
      image: images['../../assests/ir/power.png']?.default,
      tintColor: 'white',
    },
    prime: {
      value: 26,
      label: 'Prime',
      image: images['../../assests/ir/prime.png']?.default,
      tintColor: undefined,
    },
    red: {
      value: 27,
      label: 'Red',
      image: images['../../assests/ir/red.png']?.default,
      tintColor: undefined,
    },
    rewind: {
      value: 28,
      label: 'Rewind',
      image: images['../../assests/ir/rewind.png']?.default,
      tintColor: 'white',
    },
    right: {
      value: 29,
      label: 'Right',
      image: images['../../assests/ir/right.png']?.default,
      tintColor: 'white',
    },
    settings: {
      value: 30,
      label: 'Settings',
      image: images['../../assests/ir/settings.png']?.default,
      tintColor: 'white',
    },
    seven: {
      value: 31,
      label: 'Seven',
      image: images['../../assests/ir/seven.png']?.default,
      tintColor: 'white',
    },
    six: {
      value: 32,
      label: 'Six',
      image: images['../../assests/ir/six.png']?.default,
      tintColor: 'white',
    },
    source: {
      value: 33,
      label: 'Source',
      image: images['../../assests/ir/source.png']?.default,
      tintColor: 'white',
    },
    swing: {
      value: 34,
      label: 'Swing',
      image: images['../../assests/ir/swing.png']?.default,
      tintColor: 'white',
    },
    three: {
      value: 35,
      label: 'Three',
      image: images['../../assests/ir/three.png']?.default,
      tintColor: 'white',
    },
    turbo: {
      value: 36,
      label: 'Turbo',
      image: images['../../assests/ir/turbo.png']?.default,
      tintColor: 'white',
    },
    two: {
      value: 37,
      label: 'Two',
      image: images['../../assests/ir/two.png']?.default,
      tintColor: 'white',
    },
    up: {
      value: 38,
      label: 'Up',
      image: images['../../assests/ir/up.png']?.default,
      tintColor: 'white',
    },
    yellow: {
      value: 39,
      label: 'Yellow',
      image: images['../../assests/ir/yellow.png']?.default,
      tintColor: undefined,
    },
    youtube: {
      value: 40,
      label: 'YouTube',
      image: images['../../assests/ir/youtube.png']?.default,
      tintColor: undefined,
    },
    zero: {
      value: 41,
      label: 'Zero',
      image: images['../../assests/ir/zero.png']?.default,
      tintColor: 'white',
    },
    channel_plus: {
      value: 42,
      label: 'Channel +',
      image: images['../../assests/ir/plus.png']?.default,
      tintColor: 'white',
    },
    volume_plus: {
      value: 43,
      label: 'Volume +',
      image: images['../../assests/ir/plus.png']?.default,
      tintColor: 'white',
    },
    channel_minus: {
      value: 44,
      label: 'Channel -',
      image: images['../../assests/ir/minus.png']?.default,
      tintColor: 'white',
    },
    volume_minus: {
      value: 45,
      label: 'Volume -',
      image: images['../../assests/ir/minus.png']?.default,
      tintColor: 'white',
    },
    center: {
      value: 46,
      label: 'Center',
      image: images['../../assests/ir/circle.png']?.default,
      tintColor: 'white',
    },
    sixteen: {
      value: 47,
      label: 'Sixteen',
      image: images['../../assests/ir/16.png']?.default,
      tintColor: 'white',
    },
    seventeen: {
      value: 48,
      label: 'Seventeen',
      image: images['../../assests/ir/17.png']?.default,
      tintColor: 'white',
    },
    eighteen: {
      value: 49,
      label: 'Eighteen',
      image: images['../../assests/ir/18.png']?.default,
      tintColor: 'white',
    },
    nineteen: {
      value: 50,
      label: 'Nineteen',
      image: images['../../assests/ir/19.png']?.default,
      tintColor: 'white',
    },
    twenty: {
      value: 51,
      label: 'Twenty',
      image: images['../../assests/ir/20.png']?.default,
      tintColor: 'white',
    },
    twenty_one: {
      value: 52,
      label: 'Twenty One',
      image: images['../../assests/ir/21.png']?.default,
      tintColor: 'white',
    },
    twenty_two: {
      value: 53,
      label: 'Twenty Two',
      image: images['../../assests/ir/22.png']?.default,
      tintColor: 'white',
    },
    twenty_three: {
      value: 54,
      label: 'Twenty Three',
      image: images['../../assests/ir/23.png']?.default,
      tintColor: 'white',
    },
    twenty_four: {
      value: 55,
      label: 'Twenty Four',
      image: images['../../assests/ir/24.png']?.default,
      tintColor: 'white',
    },
    twenty_five: {
      value: 56,
      label: 'Twenty Five',
      image: images['../../assests/ir/25.png']?.default,
      tintColor: 'white',
    },
    twenty_six: {
      value: 57,
      label: 'Twenty Six',
      image: images['../../assests/ir/26.png']?.default,
      tintColor: 'white',
    },
    twenty_seven: {
      value: 58,
      label: 'Twenty Seven',
      image: images['../../assests/ir/27.png']?.default,
      tintColor: 'white',
    },
    twenty_eight: {
      value: 59,
      label: 'Twenty Eight',
      image: images['../../assests/ir/28.png']?.default,
      tintColor: 'white',
    },
    twenty_nine: {
      value: 60,
      label: 'Twenty Nine',
      image: images['../../assests/ir/29.png']?.default,
      tintColor: 'white',
    },
    thirty: {
      value: 61,
      label: 'Thirty',
      image: images['../../assests/ir/30.png']?.default,
      tintColor: 'white',
    },
    mode: {
      value: 62,
      label: 'Mode',
      image: images['../../assests/ir/source.png']?.default,
      tintColor: 'white',
    },
    back: {
      value: 63,
      label: 'Back',
      tintColor: 'white',
      image: images['../../assests/ir/back.png']?.default,
    },
    channel: {value: 64, label: 'Channel', tintColor: 'white', image: ''},
  };

export const ACRemoteButtons = {
    'Power On': RemoteButtons.power_on,
    'Power Off': RemoteButtons.power_off,
    Mode: RemoteButtons.mode,
    Swing: RemoteButtons.swing,
    Fan: RemoteButtons.fan,
    Turbo: RemoteButtons.turbo,
    Sixteen: RemoteButtons.sixteen,
    Seventeen: RemoteButtons.seventeen,
    Eighteen: RemoteButtons.eighteen,
    Nineteen: RemoteButtons.nineteen,
    Twenty: RemoteButtons.twenty,
    'Twenty one': RemoteButtons.twenty_one,
    'Twenty two': RemoteButtons.twenty_two,
    'Twenty three': RemoteButtons.twenty_three,
    'Twenty four': RemoteButtons.twenty_four,
    'Twenty five': RemoteButtons.twenty_five,
    'Twenty six': RemoteButtons.twenty_six,
    'Twenty seven': RemoteButtons.twenty_seven,
    'Twenty eight': RemoteButtons.twenty_eight,
    'Twenty nine': RemoteButtons.twenty_nine,
    Thirty: RemoteButtons.thirty,
  };

export const tempButton ={
    Sixteen: RemoteButtons.sixteen,
    Seventeen: RemoteButtons.seventeen,
    Eighteen: RemoteButtons.eighteen,
    Nineteen: RemoteButtons.nineteen,
    Twenty: RemoteButtons.twenty,
    'Twenty one': RemoteButtons.twenty_one,
    'Twenty two': RemoteButtons.twenty_two,
    'Twenty three': RemoteButtons.twenty_three,
    'Twenty four': RemoteButtons.twenty_four,
    'Twenty five': RemoteButtons.twenty_five,
    'Twenty six': RemoteButtons.twenty_six,
    'Twenty seven': RemoteButtons.twenty_seven,
    'Twenty eight': RemoteButtons.twenty_eight,
    'Twenty nine': RemoteButtons.twenty_nine,
    Thirty: RemoteButtons.thirty,
}

export const controlRemoteCommand  = (details)=>{
    
  axios.post(`${serverUrl.a2}/v2/nova/control`,details).then(function (res) {
      console.log('====================================');
      console.log(res);
      if(res.data.success){

      }else{
        toast.error(res.data.message)
      }
    
  }).catch(function (err) {
      console.log('====================================');
      console.log(err);
      toast.error(err.response.data.message)
      console.log('====================================');
  })
}