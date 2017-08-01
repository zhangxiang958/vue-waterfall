/* eslint-disable */
(function(root, factory){

  if(typeof define === 'function' && define.amd){

    define(factory);
  } else if(typeof exports === 'object'){

    module.exports = factory();
  } else {

    root.Util = factory();
  }

}(this, function(){
  'use strict';
  var ua = navigator.userAgent;
  var Util = {
    isMobile: function(){
        return this.isiPhone() || this.isAndroid() || isBlackberry();
    },
    isiPhone: function(){
        return /iphone/i.test(ua);
    },
    isiPad: function(){
        return /ipad/i.test(ua);
    },
    isAndroid: function(){
         return /android/i.test(ua);
    },
    isBlackberry: function(){
        return /blackberry/i.test(userAgent) || /BB10/i.test(userAgent);
    },
  }

  return Util;
}));
