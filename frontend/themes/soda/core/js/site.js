var jsSite =
{
	// init, something like a constructor
	init: function()
	{
		$('body').addClass('js');

		jsSite.share.init();
		jsSite.controls.init();
		jsSite.browserUpdate.init();
		jsSite.contentFixes.init();
		jsSite.forms.init();
		jsSite.navigation.init();

		var first = $('.content-item-image').first();

		$('.photogallery-m-index a img').hover(function(e){
			$(this).css({ opacity: 0.5 });
		}, function(e){
			$(this).css({ opacity: 1 });
		})


		first.find('img').load(function()
		{
		 $(window).trigger('resize');
		});



		$(window).on("resize", function( event )
		{

			var extra = 30;
			if($(window).width() <= 768){
				extra = -10;
			}else{
				extra = 20;
			}

			if($(window).width() <= 481)
			{
				$('.name').css('margin-top','auto');
			}else {
				$('.name').css('margin-top', first.height() - $('.name').height() - extra);

			}	


			if($(window).width() <= 768){
				var offset = $('.header-logo').offset();
				$("html, body").animate({ scrollTop: offset.top - 23}, "fast");
			}

		

			$('.imageHeight').height($(window).width() / 2);


		});



    $(window).on("resize", function( event )
    {
        var footerItems = $('.page-footer .grid-item');
        var lastFooterItem = footerItems.last();
        var beforeLastFooterItem = lastFooterItem.prev();

        if($(window).width() <= 768)
        {
          if(beforeLastFooterItem.hasClass('footer-copyright')){
            beforeLastFooterItem.insertAfter(lastFooterItem);
          }

        }else {

          if(!beforeLastFooterItem.hasClass('footer-copyright')){
            beforeLastFooterItem.insertAfter(lastFooterItem);
          }
        }

    });

      $(window).trigger('resize');



	$('.imageHeight').height($(window).width() / 2);




		if($('#chart-one').length > 0){
			$('#chart-one').highcharts({

				chart: {
					backgroundColor: 'transparent'
				},
		        title: {
		            text: 'Carats',
		             opposite: true,
		              style: {
					        color: "#000000"
					    }
		        },
		    
		        xAxis: {
		            categories: ['2008', '2009', '2010', '2011', '2012'],
		           // opposite: true,
		            gridLineWidth: 1,
		            lineColor: '#000000'
		        },
		        yAxis: {
		            minRange: 12,
		            title: {
		           		text: 'Million',
		           		 style: {
					        color: "#000000"
					    }
		        	}
		        },
		        tooltip: {
		            valueSuffix: '',
		              headerFormat: '',
		            //pointFormat: '{point.y *1000}'
		            formatter: function(){
		            	if(this.point) {

		            		return ((this.point.y) * 1000000).formatMoney(0, '.', '.');
		            	}
		            }
		        },
		       
		        series: [{
		            data: [4,6,6.5,6,9.35],
		            showInLegend: false,
		            name: 'Price',
		            color: '#000000',
				    lineWidth: 1
		        }]
		    });
		}
		   

		if($('#chart-two').length > 0){
	 		$('#chart-two').highcharts({
	 			chart: {
					backgroundColor: 'transparent'
				},
		        title: {
		            text: 'Chart Two',
		             opposite: true,
		              style: {
					        color: "#000000"
					    }
		        },
		    
		        xAxis: {
		            categories: ['2008', '2009', '2010', '2011', '2012'],
		           // opposite: true,
		            gridLineWidth: 1,
		            lineColor: '#999999'
		        },
		        yAxis: {
		            minRange: 12,
		            title: {
		           		text: 'Million',
		           		 style: {
					        color: "#000000"
					    }
		        	}
		        },
		        tooltip: {
		            valueSuffix: '',
		              headerFormat: '',
		            //pointFormat: '{point.y *1000}'
		            formatter: function(){
		            	if(this.point) {

		            		return ((this.point.y) * 1000000).formatMoney(0, '.', '.');
		            	}
		            }
		        },
		       
		        series: [{
		            data: [8,12,6.5,3,10.35],
		            showInLegend: false,
		            name: 'Price',
		            color: '#999999',
				    lineWidth: 1
		        }]
		    });
		}

		
		$('.js-chart-slider').each(function(i,el){
			if(i > 0) { $(el).hide(); }

			$('.js-chart-navigation').append('<a href="#" data-id="'+i+'"></a>')
		});

		$('.js-chart-navigation a').eq(0).addClass('selected');

		$('.js-chart-navigation a').click(function(e){
			e.preventDefault();
			
			$('.js-chart-slider').hide();

			$('.js-chart-navigation a').removeClass('selected');
			$(this).addClass('selected');
			
			$('.js-chart-slider').eq(($(this).data('id'))).show()
		})






	}
}

jsSite.controls =
{
	// init, something like a constructor
	init: function()
	{
		jsSite.controls.bindTargetBlank();
	},

	// bind target blank
	bindTargetBlank: function()
	{
		$('a.js-target-blank').attr('target', '_blank');
	}
}

jsSite.share =
{
	// init, something like a constructor
	init: function()
	{
		// enable the share-menu
		if($('.share').length > 0) $('.share').shareMenu();
	}
}

jsSite.browserUpdate =
{
	// init, something like a constructor
	init: function()
	{
		// Browser update
		var $buoop = {} 
		$buoop.ol = window.onload; 
		window.onload=function(){ 
			try {if ($buoop.ol) $buoop.ol();}catch (e) {} 
			var e = document.createElement("script"); 
			e.setAttribute("type", "text/javascript"); 
			e.setAttribute("src", "http://browser-update.org/update.js"); 
			document.body.appendChild(e); 
		}
	}
}

jsSite.contentFixes =
{
	// init, something like a constructor
	init: function()
	{
		jsSite.contentFixes.iframe();
		jsSite.contentFixes.editor();
		jsSite.contentFixes.equalHeights();
		//jsSite.contentFixes.dotdotdot();
	},
	iframe: function()
	{
		// fix the z-index of Youtube-embeds
		$('iframe').each(function ()
		{
			var url = $(this).attr('src');

			var prefix = '?';
			if(url.indexOf('?') !== -1){} prefix = '&';

			$(this).attr('src',url + prefix + 'wmode=transparent');
		});
	},
	editor: function()
	{
		// a-img problem
		$('.editor a > img').parent().addClass('linked-image');

		// p-img problem
		$('.editor p img').each(function(i)
		{
			// get parent (p)
			var parent = $(this).parents('p').get(0);

			// copy of parent
			parentCopy = $(parent).clone();

			// get all images inside parent
			parentCopy.find('img').each(function()
			{
				if($(this).hasClass('left') || $(this).hasClass('right'))
				{
					if($(this).parent('a').length) $(this).parent('a').remove();
					else $(this).remove();
				}
			});

			// no more content left = only images so we'll add a class to the container
			if(!parentCopy.html().replace(/\s*/g, '')) parent.addClass('floated');
		});
	},
	equalHeights: function()
	{
		if($('.js-equal-height').length > 0)
		{

			$('.js-equal-height').equalHeights();

			$(window).on("debouncedresize", function( event )
			{
				$('.js-equal-height').equalHeights();

			});
		}
	},
	dotdotdot: function(){
		$("js-dotdotdot").dotdotdot({
			fallbackToLetter: true
		});
	}
}

jsSite.forms =
{
	// init, something like a constructor
	init: function()
	{
		jsSite.forms.bindFocus();
		jsSite.forms.bindSubmit();
	},
	bindSubmit: function()
	{
		$('.js-submit-form').click(function(){
			$(this).closest('form').submit();
			return false;
		});
	},
	bindFocus: function()
	{
		$('js-focus').focus();
	}
}

jsSite.navigation =
{
	// init, something like a constructor
	init: function()
	{
		jsSite.navigation.responsive();
	},
	responsive: function()
	{
		var $menu = $('#navigation-wrapper'),
		$menulink = $('.js-toggle-navigation-wrapper');

		$menulink.click(function()
		{
			$menulink.closest('.toggle-navigation-wrapper').toggleClass('is-expanded');
			$menu.toggleClass('is-expanded');
			return false;
		});
	}
}


$(jsSite.init);
