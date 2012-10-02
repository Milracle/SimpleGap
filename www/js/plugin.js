 
var plugin = {
    login: function() {
        var appId = "404196699634359";
        window.plugins.facebookConnect.login({permissions: ["email", "user_about_me"], appId: appId}, function(result) {
            console.log("facebookConnect.login:" + JSON.stringify(result));
                                             //for (var key in result) {
                                            // if (result.hasOwnProperty(key)) {
                                              console.log("id -> " + result["id"]);
                                           //  }
                                             
                                             //}
          $.getJSON("http://192.168.2.17/HE/Home/FBLogin?FBid="+result["id"],
                    function (data) {
                    if(data.userID=="")
                    {
                        //plugin.logout();
                        window.location="error.html";
                    }
                    else
                    {
                        window.localStorage.setItem("userID", data.userID);
                        window.location="profile.html";
                    }	
                })
          .fail(
                function (jqXHR, textStatus, err) {
                alert('Error Saving Data :', err);
                });  
          });
    
    },
    requestWithGraphPath: function() {
        window.plugins.facebookConnect.requestWithGraphPath("/me/friends", function(result) {
            console.log("facebookConnect.requestWithGraphPath:" + JSON.stringify(result));
        });
    },
    dialog : function() {
        var dialogOptions = {
            method: 'feed',
            app_id: '404196699634359',
            name: 'roei',
            link: 'https://surf-space.com/spots/israel',
            description: 'stuff...',
            picture: 'http://fbrell.com/f8.jpg'
        }
        
        facebookConnect.dialog('feed', dialogOptions, function(response) {
            console.log("FacebookConnect.dialog:" + JSON.stringify(response));
        });
    },
    logout : function() {
   
        window.plugins.facebookConnect.logout(function(result) {
            console.log("facebookConnect.logout:" + JSON.stringify(result));
            window.localStorage.clear();
            window.location="index.html";
        });
    }
};

function getParameterByName(name)
{
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
                          var regexS = "[\\?&]" + name + "=([^&#]*)";
                          var regex = new RegExp(regexS);
                          var results = regex.exec(window.location.search);
                          if(results == null)
                          return "";
                          else
                          return decodeURIComponent(results[1].replace(/\+/g, " "));
}

