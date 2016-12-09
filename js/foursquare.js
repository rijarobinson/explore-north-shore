    $.getJSON('https://api.foursquare.com/v2/venues/4ab66d3bf964a5200b7720e3/tips?limit=10&sort=recent&client_id=PVIQJ5PWWLE3UMRRNDZ3X1SWVFEHIXNRH12HCXEF0D0J5GOQ&client_secret=YJ0TST4PGCM41UPONGMIEW2ZKOP04XAX2SJSMXGYI3DYMTEU&v=20161209',
    function(data) {
        console.log("data: " + JSON.stringify(data["response"]["tips"]["items"]));
        $.each(data.response["tips"]["items"], function(i,venues){
            content = '<p>' + JSON.stringify(data.response["tips"]["items"][i]["text"]) + '-' + i + '-names div</p>';
            $(content).appendTo("#names");
       });
});