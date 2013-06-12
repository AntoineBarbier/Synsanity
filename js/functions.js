function feedParsing() { 
				$.ajax({
					//url:'./entertainment.xml',
					url:'http://pipes.yahoo.com/pipes/pipe.run?_id=d810aeb319ae15771df07ee602120203&_render=rss',
					dataType:'xml',
					type:'GET',
					success:function(xml) {
						$(xml).find('item').each(function() {
	                        //assigning feed video item data to variable
						    var title = $(this).find("title").text(); 
							var des = $(this).find("description").text();
							//var link = $(this).find("guid").text();
							var link = $(this).find("enclosure").attr('url');
	                        var thumb = $(this).find("link").text();
	                        var link2= 'http://ads.geo.rnmd.net/playVideo?siteId=rhythm_test&userId=testuser&content=' + link;

	                        //Building the image div
	                        var $img = $('<img>').attr('src',thumb);
	                        var $img2 = $('<div class="video-thumb"></div>').append($img);
	                        var $img3 = $('<div class="small-4 columns"></div>').append($img2);

	                        //Building the video title as h3
							var $link = $('<a></a>').attr('href',link2).attr('target','_self').html(title);
	                        var $link2 = $('<h3></h3>').append($link);

	                        //Building the video description as p
							var $des = $('<p></p>').html(des);

	                        //Building the video title + description div
	                        var $videoItem = $('<div class="video-description"></div>').append($link2,$des);
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
						alert("I am sorry, But I can't fetch that feed");
					}
				});
		}