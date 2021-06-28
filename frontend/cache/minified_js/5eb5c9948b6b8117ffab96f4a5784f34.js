(function($)
{
$.fn.shareMenu=function(options)
{
var twitterLoaded=false;
var linkedInLoaded=false;
var googlePlusLoaded=false;
var pinterestLoaded=false;
var defaults=
{
debug:false,
default_image:document.location.protocol+'//'+document.location.host+'/apple-touch-icon.png',
sequence:['facebook','twitter','netlog','linkedin','digg','delicious','googleplus','pinterest'],
isDropdown:true
};
var settings=
{
delicious:{name:'delicious',show:true,label:'Delicious'},
digg:{name:'digg',show:true,label:'Digg'},
facebook:{name:'facebook',show:true,width:90,verb:'like',colorScheme:'light',font:'arial'},
linkedin:{name:'linkedin',show:true,label:'LinkedIn'},
netlog:{name:'netlog',show:true,label:'Netlog'},
twitter:{name:'twitter',show:true,label:'tweet'},
googleplus:{name:'googleplus',show:true,label:'Google +1'},
pinterest:{name:'pinterest',show:true,label:'Pin it',countLayout:'horizontal'}};
var options=$.extend(defaults,options);
options=$.extend(true,settings,options);
return this.each(function()
{
var $this=$(this);
var link=document.location.href;
var title=$('title').html();
var description='';
var image='';
if($this.attr('href')!=undefined)link=$this.attr('href');
if(link.substr(0,1)=='#')link=document.location.href;
if(link.substr(0,4)!='http')link=document.location.protocol+'//'+document.location.host+link;
if($('meta[property="og:title"]').attr('content')!=undefined)title=$('meta[property="og:title"]').attr('content');
if($this.attr('title')!=undefined)title=$this.attr('title');
if($this.data('title')!=undefined)title=$this.data('title');
if($('meta[property="og:description"]').attr('content')!=undefined)description=$('meta[property="og:description"]').attr('content');
if($this.data('description')!=undefined)description=$this.data('description');
if($('meta[property="og:image"]').attr('content')!=undefined)image=$('meta[property="og:image"]').attr('content');
if($this.data('image')!=undefined)image=$this.data('image');
if(image==''&&options.default_image!='')image=options.default_image;
if(options.isDropdown)var html='<ul style="display: none;" class="shareMenu">'+"\n";
else var html='<ul class="shareMenu">'+"\n";
for(var i in options.sequence)
{
if(options[options.sequence[i]].show)
{
switch(options[options.sequence[i]].name)
{
case'delicious':
var url='http://delicious.com/save?url='+encodeURIComponent(link);
if(title!='')url+='&title='+title;
if(description!='')url+='&notes='+description;
html+='<li class="shareMenuDelicious">'+
'	<a href="'+url+'" target="_blank">'+
'		<span class="icon"></span>'+
'		<span class="textWrapper">'+options.delicious.label+'</span>'+
'	</a>'+
'</li>'+"\n";
break;
case'digg':
var url='http://digg.com/submit?url='+encodeURIComponent(link);
if(title!='')url+='&title='+title;
html+='<li class="shareMenuDigg">'+
'	<a href="'+url+'" target="_blank">'+
'		<span class="icon"></span>'+
'		<span class="textWrapper">'+options.digg.label+'</span>'+
'	</a>'+
'</li>'+"\n";
break;
case'facebook':
if(options.debug&&$('meta[property^="og"]').length==0)console.log('You should provide OpenGraph data.');
html+='<li class="shareMenuFacebook">';
if(typeof FB!='object')
{
html+='<iframe src="http://www.facebook.com/plugins/like.php?href='+link+'&amp;send=false&amp;layout=button_count&amp;width='+options.facebook.width+'&amp;show_faces=false&amp;action='+options.facebook.verb+'&amp;colorscheme='+options.facebook.colorScheme+'&amp;font='+options.facebook.font+'&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:'+options.facebook.width+'px; height:21px;" allowTransparency="true"></iframe>'}
else
{
html+='<fb:like href="'+link+'" send="false" layout="button_count" width="'+options.facebook.width+'" show_face="false" action="'+options.facebook.verb+'" colorscheme="'+options.facebook.colorScheme+'" font="'+options.facebook.font+'"></fb:like>'+"\n"}
html+='</li>';
break;
case'linkedin':
if(!linkedInLoaded)
{
$('script').each(function()
{
if($(this).attr('src')=='http://platform.linkedin.com/in.js')linkedInLoaded=true});
if(!linkedInLoaded)
{
var script=document.createElement('script')
script.src='http://platform.linkedin.com/in.js';
$('head').after(script);
linkedInLoaded=true}
}
var url=encodeURIComponent(link);
html+='<li class="shareMenuLinkedin">'+
'	<script type="IN/Share" data-url="'+url+'" data-counter="right"></script>'+
'</li>'+"\n";
break;
case'netlog':
var url='http://www.netlog.com/go/manage/links/view=save&origin=external&url='+encodeURIComponent(link);
if(title!='')url+='&title='+title;
if(description!='')url+='&description='+description;
if(image!='')url+='&thumb='+encodeURIComponent(image);
url+='&referer='+encodeURIComponent(document.location);
html+='<li class="shareMenuNetlog">'+
'	<a href="'+url+'" target="_blank">'+
'		<span class="icon"></span>'+
'		<span class="textWrapper">'+options.netlog.label+'</span>'+
'	</a>'+
'</li>'+"\n";
break;
case'twitter':
if(!twitterLoaded)
{
$('script').each(function()
{
if($(this).attr('src')=='http://platform.twitter.com/widgets.js')twitterLoaded=true});
if(!twitterLoaded)
{
var script=document.createElement('script')
script.src='http://platform.twitter.com/widgets.js';
$('head').after(script);
twitterLoaded=true}
}
html+='<li class="shareMenuTwitter">'+
'	<a href="http://twitter.com/share" class="twitter-share-button" data-url="'+link+'"';
if(title!='')html+=' data-text="'+title+'"';
html+=' data-lang="'+jsFrontend.current.language+'">'+options.twitter.label+'</a>'+
'</li>';
break;
case'googleplus':
if(!googlePlusLoaded)
{
$('script').each(function()
{
if($(this).attr('src')=='https://apis.google.com/js/plusone.js')googlePlusLoaded=true});
if(!googlePlusLoaded)
{
var script=document.createElement('script')
script.src='https://apis.google.com/js/plusone.js';
$('head').after(script);
googlePlusLoaded=true}
}
html+='<li class="shareMenuGoogleplus">'+
'	<div class="g-plusone" data-size="medium" data-href="'+link+'"></div>'+
'</li>';
break;
case'pinterest':
if(image!='')
{
if(!pinterestLoaded)
{
$('script').each(function()
{
if($(this).attr('src')=='//assets.pinterest.com/js/pinit.js')pinterestLoaded=true});
if(!pinterestLoaded)
{
var script=document.createElement('script')
script.src='//assets.pinterest.com/js/pinit.js';
$('head').after(script);
$('head').append('<style>iframe[src^="//assets.pinterest"] { display: none; }</style>');
pinterestLoaded=true}
if(typeof options[options.sequence[i]].countLayout!='undefined')countLayout=options[options.sequence[i]].countLayout;
else countLayout='none';
if(countLayout!='horizontal'||countLayout!='vertical'||countLayout!='none')countLayout='none';
html+='<li class="shareMenuPinterest">'+
'	<a href="http://pinterest.com/pin/create/button/?url='+encodeURIComponent(link)+
'&media='+encodeURIComponent(image)+
'&description='+encodeURIComponent(description)+
'" class="pin-it-button" count-layout="'+countLayout+'">'+
'<img border="0" src="//assets.pinterest.com/images/PinExt.png" title="Pin It" /></a>'+
'</li>'}
}
break}
}
}
html+='</ul>';
$this.append(html);
if(options.isDropdown)
{
$this.on('click',function(e)
{
$this.find('ul.shareMenu').toggle()});
$this.hover(
function()
{
$this.find('ul.shareMenu').show()},
function()
{
$this.find('ul.shareMenu').hide()}
)}
})}})(jQuery);