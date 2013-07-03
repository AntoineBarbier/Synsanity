
// Display date on right side of the page
displayDate();

//Function to parse feeds and build a row for each video element
function feedParsing(feedUrl) { 
	var i = 0;
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
				var link = $(this).find("enclosure").attr("url");
				//console.log(link);
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

                //Fetching the pub date
				var pubDate = new Date($(this).find("pubDate").text()); 
				var day = pubDate.getDate();
				var month = pubDate.getMonth() + 1;
				var year = pubDate.getFullYear();
				var date = day + '/' + month + '/' + year;
				// var $date = $('<p></p>').html(date);

                //Building the video description as p
				var $des = $('<p></p>').html(date + ' - ' + des);

                //Building the video title + description div
				var $videoItem = $('<div class="video-description"></div>').append($link4,$des);
                var $videoItem2 = $('<div class="small-8 columns"></div>').append($videoItem);
	

				// Wrapping the video elements within the row and video-item divs
				var wrapperRow = "<div class='row'>";
				var wrapperVideoItem;
                if (i == 0) {
                	wrapperVideoItem = "<div class='first-video-item'>";
                }
                else {
                	wrapperVideoItem = "<div class='video-item'>";
				}
				wrapperVideoItem = $(wrapperVideoItem).attr('data-guid', link).attr('data-title', title).attr('data-desc', des);
				$(".feed-container").append($(wrapperRow).append(($(wrapperVideoItem)).append($img3,$videoItem2)));	
				i++;			
			})
		},
		error:function() {
			alert("Oops, sorry! Something wrong happened. Please reload the page...");
		}
	});
}


$(".feed-container").on("click", ".row", function(){
	//alert("row clicked")
	var value = $(this).children().data('guid');
	//console.log(value);
	var videoUrl= 'http://ads.geo.rnmd.net/playVideo?siteId=rhythm_test&content=' + value;
	//console.log(videoUrl);
	net.rnmd.sdk.playVideo(videoUrl);
});

function displayDate() {
	var month=new Array(12);
	month[0]="January";
	month[1]="February";
	month[2]="March";
	month[3]="April";
	month[4]="May";
	month[5]="June";
	month[6]="July";
	month[7]="August";
	month[8]="September";
	month[9]="October";
	month[10]="November";
	month[11]="December";
	var currentDate = new Date();
	var dateToDisplay = month[currentDate.getMonth()] + ' ' + currentDate.getDate() + ', ' + currentDate.getFullYear();
	//console.log(dateToDisplay);
	$('#currentDate').html(dateToDisplay);
}



