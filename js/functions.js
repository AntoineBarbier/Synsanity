
//Function to parse feeds
function feedParsing(feedUrl) { 
	$.ajax({
		//url:'./entertainment.xml',
		url: feedUrl,
		dataType:'xml',
		type:'GET',
		success:function(xml) {
			$(xml).find('item').each(function() {
				
                //assigning feed video item data to variable
			    var title = $(this).find("title").text(); 
				var des = $(this).find("description").text();
				//var link = $(this).find("guid").text();
				var link = $(this).find("enclosure").attr("url");
				//var link = $(this).find("[media\\:content]").attr("url");
				console.log(link);
                var thumb = $(this).find("link").text();
                var link2= '#';
                var onClickUrl= '"http://ads.geo.rnmd.net/playVideo?siteId=rhythm_test&userId=758393002&content=' + link;
                var onClickFunction = 'net.rnmd.sdk.playVideo(' + onClickUrl;
                onClickFunction = onClickFunction + '");';

                //Building the image div
                var $img = $('<img>').attr('src',thumb);
                var $img2 = $('<div class="video-thumb"></div>').append($img);
                var $img3 = $('<div class="small-4 columns"></div>').append($img2);

                //Building the video title as h3
				var $link3 = $('<a></a>').attr('href',link2).attr('target','_self').attr('onclick', onClickFunction).html(title);
                var $link4 = $('<h3></h3>').append($link3);

                //Building the video description as p
				var $des = $('<p></p>').html(des);

                //Building the video title + description div
                var $videoItem = $('<div class="video-description"></div>').append($link4,$des);
                var $videoItem2 = $('<div class="small-8 columns"></div>').append($videoItem);

                //Fetching the pub date
				var pubDate = new Date($(this).find("pubDate").text()); 
				var day = pubDate.getDate();
				var month = pubDate.getMonth() + 1;
				var year = pubDate.getFullYear();
				var date = day + '/' + month + '/' + year;
				var $date = $('<div class="date"></div>').text(date)	

				var wrapperRow = "<div class='row'>";
				var wrapperVideoItem = "<div class='video-item'>";
				$(".feed-container").append($(wrapperRow).append(($(wrapperVideoItem)).append($img3,$videoItem2)));				
			})
		},
		error:function() {
			//alert("I am sorry, But I can't fetch that feed");
		}
	});
}

// function  playSelectedVideo(e) {
// 	var videoUrl = "http://ads.geo.rnmd.net/playVideo?siteId=rhythm_test&userId=758393002-&content=http://www.eonline.com/shared/Eonline/mobile/rhythm_eol_iphone_app/video/raw_20130614_phillippe_208778.m4v"; 
// 	var videoUrl = (e.target.a);
// 	console.log(videoUrl);
// 	net.rnmd.sdk.playVideo(videoUrl);
// }

//$(".feed-container").on("click", ".video-item" , playSelectedVideo);
//$(".video-item").click(playVideo);

//$("h3 a").click(playSelectedVideo);
//$(".feed-container").on("click", "a" , playSelectedVideo);



