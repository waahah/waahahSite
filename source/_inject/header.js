<%
var subtitle = page.subtitle || page.title
var banner_img = page.banner_img || theme.index.banner_img
var banner_img_height = page.banner_img_height || theme.index.banner_img_height
var banner_mask_alpha = page.banner_mask_alpha || theme.index.banner_mask_alpha
var colorSchema = theme.dark_mode && theme.dark_mode.enable && theme.dark_mode.default ? theme.dark_mode.default : ''
var banner_video = theme.index.banner_video
%>
	<script type="text/javascript" src="/vvd_js/jquery.js"></script>

	<div class="banner" id='banner' >

		<div class="full-bg-img" >

			<% if(banner_video){ %>
<div id="banner_video_insert">
</div>
<script>
				
	var ua = navigator.userAgent;
	var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
		isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
		isAndroid = ua.match(/(Android)\s+([\d.]+)/),
		isMobile = isIphone || isAndroid;

	function set_video_attr(id){
		
		var height = document.body.children[0].clientHeight

		var width = document.body.children[0].clientWidth

		var video_item = document.getElementById(id);

		if (height / width < 0.56){
			video_item.setAttribute('width', '100%');
			video_item.setAttribute('height', 'auto');
		} else {
			video_item.setAttribute('height', '100%');
			video_item.setAttribute('width', 'auto');
		}
	}

	$.getJSON('/vvd_js/video_url.json', function(data){
	$.getJSON('/vvd_js/video_url.json', function(data){
		if (!isMobile){
			var video_list_length = data.length
			var seed = Math.random()
			index = Math.floor(seed * video_list_length)
			
			video_url = data[index]
			video_html_res = "<video id='video_item' style='position: absolute;' muted='muted' src=" + video_url + " autoplay='autoplay' loop='loop'></video>"

			document.getElementById("banner_video_insert").innerHTML = video_html_res;
			set_video_attr('video_item')
		}

	});

	if (!isMobile){
		window.onresize = function(){
			set_video_attr('video_item')
			}
		}
	</script>

<% } %>
			</div>
		</div>
    </div>
