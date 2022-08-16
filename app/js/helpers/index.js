//Возвращает 0 - десктоп
//           1 - мобильное устройство
export function getDeviceType(){
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    return 1;
  }else{
    return 0;
  }
};