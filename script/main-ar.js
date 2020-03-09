    var toggle = false;

    var width = 1;
    
    function openNav() {
      document.getElementById("strip1").style.right = "90%";
      document.getElementById("menu").style.right = "92%";
      document.getElementById("strip2").style.width = "22%";
      document.getElementById("mySidenav").style.width = "90%";
      document.getElementById("mySidenavtop").style.width = "90%";
      document.getElementById("mySidenav2").style.width = "90%";
      

      //el = document.querySelector("boy");
      //el.setAttribute("visible",true);
      
    }
    
    function closeNav() {
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("mySidenavtop").style.width = "0";
      document.getElementById("mySidenav2").style.width = "0";
      document.getElementById("strip1").style.right = "0";
      document.getElementById("menu").style.right = "2%";
      document.getElementById("strip2").style.width = "0%";
      

      //el = document.querySelector("boy");
      //el.setAttribute("visible",false);
    }
    
    function check(){
    	
    	if( width>0){
    		closeNav();
    		width = 0;
    	} else{
    		openNav();
    		width = 1;
    	}
    }
    
    function getAllUrlParams(url) {

      // get query string from url (optional) or window
      var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

      // we'll store the parameters here
      var obj = {};

      // if query string exists
      if (queryString) {

        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];

        // split our query string into its component parts
        var arr = queryString.split('&');

        for (var i = 0; i < arr.length; i++) {
          // separate the keys and the values
          var a = arr[i].split('=');

          // set parameter name and value (use 'true' if empty)
          var paramName = a[0];
          var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

          // (optional) keep case consistent
          paramName = paramName.toLowerCase();
          if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

          // if the paramName ends with square brackets, e.g. colors[] or colors[2]
          if (paramName.match(/\[(\d+)?\]$/)) {

            // create key if it doesn't exist
            var key = paramName.replace(/\[(\d+)?\]/, '');
            if (!obj[key]) obj[key] = [];

            // if it's an indexed array e.g. colors[2]
            if (paramName.match(/\[\d+\]$/)) {
              // get the index value and add the entry at the appropriate position
              var index = /\[(\d+)\]/.exec(paramName)[1];
              obj[key][index] = paramValue;
            } else {
              // otherwise add the value to the end of the array
              obj[key].push(paramValue);
            }
          } else {
            // we're dealing with a string
            if (!obj[paramName]) {
              // if it doesn't exist, create property
              obj[paramName] = paramValue;
            } else if (obj[paramName] && typeof obj[paramName] === 'string'){
              // if property does exist and it's a string, convert it to an array
              obj[paramName] = [obj[paramName]];
              obj[paramName].push(paramValue);
            } else {
              // otherwise add the property
              obj[paramName].push(paramValue);
            }
          }
        }
      }
      return obj;
    }
    
    
    var nama = getAllUrlParams(window.location.href).user_code;
    var id = nama;
    console.log(id);
    //const url2 = 'https://ar.sirkel.id/api/getUser?user_code=' + id;
    const url2 = 'https://ar.wika-beton.co.id/admin/public/api/getUser?user_code=' + id;
    var Http = new XMLHttpRequest();
    Http.open('GET', url2);
    console.log(url2);
    Http.responseType = 'json';
    let jsonResponse;
    var nama, jabatan, telephone, email, facebook, instagram, twitter, linkedin, photo, video, poster;
  
    Http.onload = function() {
        jsonResponse = Http.response;
        console.log(jsonResponse);
        nama = jsonResponse.name;
        jabatan = jsonResponse.position;
        email = jsonResponse.email;
        facebook = jsonResponse.link_fb;
        instagram = jsonResponse.link_ig;
        twitter = jsonResponse.link_twitter;
        linkedin = jsonResponse.link_linked;
        telephone = jsonResponse.phone;
        poster = jsonResponse.link_poster;
        document.getElementById("brosur").href = poster;
        document.getElementById("telephone").href = "tel:"+telephone;
        document.getElementById("email").href = ("mailto:"+email);
        video = jsonResponse.video_name;
        video = "videos/" + video;
        //console.log("src video = ", video);
        //document.querySelector('#vid').setAttribute('src', video);
        //---------------- kalo mau ganti per orang data sosmednya ----------------------------//
        //document.getElementById("instagram").href = instagram;
        //document.getElementById("twitter").href = twitter;
        //document.getElementById("facebook").href = facebook;
        //document.getElementById("linkedin").href = linkedin;
        //-------------------------------------------------------------------------------------//
        photo=jsonResponse.photo;
        //console.log(photo);

        document.getElementById("namaa").innerHTML = nama;
        document.getElementById("jabb").innerHTML = jabatan;
        document.getElementById("passfoto").src= photo;
        //document.querySelector('#passfoto').setAttribute('src', photo);

        console.log(document.getElementById("namaa").innerHTML);
        console.log(document.getElementById("passfoto").src);

        AFRAME.registerComponent('profil-handler', {
            init: function() {
                document.querySelector('#profil').setAttribute('src', photo);
               
            }
        });
    };
    Http.send();

   var statuskondisi = 0;
     AFRAME.registerComponent('video-vidhandler', {
        
        init: function() {
          console.log('video init entered');
          
          var masuk = 0;
          this.logo = document.querySelector("#logo");
          this.icon = document.querySelector("#iconfoto");
          this.imgMap3 = document.querySelector("#dasar");
          this.logo.pause();
          this.icon.pause();
          
         
          this.prevPosition = null;
          this.prevRotation = null;
          
        
          
            
            
        },
        tick: function() {
          this.logo.play();
          this.icon.play();
	  
          if (this.el.object3D.visible == true) {
            //document.getElementById("boy").style.display = "block";
          
            
            console.log("masuk 3D");
              if (!toggle) {
                  
              }
              this.imgMap3.setAttribute('visible', 'true');
              if(this.prevPosition) { 
                    this.imgMap3.object3D.position.lerp(this.prevPosition, 0.1)
                    let rot = this.imgMap3.object3D.rotation.toVector3().lerp(this.prevRotation, 0.1)
                    this.imgMap3.object3D.rotation.setFromVector3(rot)
                  } else {
                    this.imgMap3.setAttribute('position', this.el.getAttribute('position'))
                    this.imgMap3.setAttribute('rotation', this.el.getAttribute('rotation'))
                  }
                  this.prevPosition = this.el.object3D.position
                  this.prevRotation = this.el.object3D.rotation

          } else {
              //document.getElementById("boy").style.display = "none";
      
              console.log("no");
              this.logo.pause();
              this.icon.pause();
              this.imgMap3.setAttribute('visible', 'false');
              this.prevPosition = null;
              this.prevRotation = null;
              
          }
        }
    });
    
            
            window.history.replaceState(null, null, window.location.pathname);


