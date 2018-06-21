$(function() {
	// ======================= Плагин imagesLoaded ===============================
	// https://github.com/desandro/imagesloaded

	// $('#my-container').imagesLoaded(myFunction)
	// выполняет возвратный вызов, когда все изображения загружены.
	// Нужно потому, что .load() не работает на кэшированных изображениях.

	// Возвратная функция получает коллекцию изображений как аргумент.

	$.fn.imagesLoaded 		= function( callback ) {
	var $images = this.find('img'),
		len 	= $images.length,
		_this 	= this,
		blank 	= 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

	function triggerCallback() {
		callback.call( _this, $images );
	}

	function imgLoaded() {
		if ( --len <= 0 && this.src !== blank ){
			setTimeout( triggerCallback );
			$images.unbind( 'load error', imgLoaded );
		}
	}

	if ( !len ) {
		triggerCallback();
	}

	$images.bind( 'load error',  imgLoaded ).each( function() {
		// Кэшированные изображения иногда не запускают загрузку, поэтому мы сбрасываем источник.
		if (this.complete || this.complete === undefined){
			var src = this.src;
			// Хак для webkit ( http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f)
			// Обход предупреждения webkit
			this.src = blank;
			this.src = src;
		}
	});

	return this;
	};

	// Контейнер галереи
	var $rgGallery			= $('#rg-gallery'),
	// Контейнер карусели
	$esCarousel			= $rgGallery.find('div.es-carousel-wrapper'),
	// Пункт карусели
	$items				= $esCarousel.find('ul > li'),
	// Общее количество пунктов
	itemsCount			= $items.length;
	
	Gallery				= (function() {
			// Индекс текущего пункта
			var current			= 0, 
			// Режим : карусель || во весь экран
			mode 			= 'carousel',
			// Проверка, если одно изображение загружено
			anim			= false,
			init			= function() {
				
				// (Не обязательно) предварительная загрузка изображений здесьы...
				$items.imagesLoaded( function() {
					// Добавляем опции
					_addViewModes();
					
					// Добавляем обертку большого изображения
					_addImageWrapper();
					
					// Выводим первое изображение
					_showImage( $items.eq( current ) );
				});
				
				// Инициализуем карусель
				_initCarousel();
				
			},
			_initCarousel	= function() {
				
				// Используем плагин elastislide:
				$esCarousel.show().elastislide({
					imageW 	: 65,
					onClick	: function( $item ) {
						if( anim ) return false;
						anim	= true;
						// По нажатию клавиши мыши выводим изображение
						_showImage($item);
						// Меняем текущее
						current	= $item.index();
					}
				});
				
				// Устанавливаем текушее для elastislide
				$esCarousel.elastislide( 'setCurrent', current );
				
			},
			_addViewModes	= function() {
				
				// Кнопки вверху справа: скрыть / показать карусель
				
				var $viewfull	= $('<a href="#" class="rg-view-full"></a>'),
					$viewthumbs	= $('<a href="#" class="rg-view-thumbs rg-view-selected"></a>');
				
				$rgGallery.prepend( $('<div class="rg-view"/>').append( $viewfull ).append( $viewthumbs ) );
				
				$viewfull.bind('click.rgGallery', function( event ) {
					$esCarousel.elastislide( 'destroy' ).hide();
					$viewfull.addClass('rg-view-selected');
					$viewthumbs.removeClass('rg-view-selected');
					mode	= 'fullview';
					return false;
				});
				
				$viewthumbs.bind('click.rgGallery', function( event ) {
					_initCarousel();
					$viewthumbs.addClass('rg-view-selected');
					$viewfull.removeClass('rg-view-selected');
					mode	= 'carousel';
					return false;
				});
				
			},
			_addImageWrapper= function() {
				
				// Добавляем структуру для больших изображений и кнопок навигации (если общее количество пунктов  > 1)
								
				$('#img-wrapper-tmpl').tmpl( {itemsCount : itemsCount} ).appendTo( $rgGallery );
				
				if( itemsCount > 1 ) {
					// Добавляем навигацию
					var $navPrev		= $rgGallery.find('a.rg-image-nav-prev'),
						$navNext		= $rgGallery.find('a.rg-image-nav-next'),
						$imgWrapper		= $rgGallery.find('div.rg-image');
						
					$navPrev.bind('click.rgGallery', function( event ) {
						_navigate( 'left' );
						return false;
					});	
					
					$navNext.bind('click.rgGallery', function( event ) {
						_navigate( 'right' );
						return false;
					});
				
					// Добавляем событие touchwipe для обертки большого изображения
					$imgWrapper.touchwipe({
						wipeLeft			: function() {
							_navigate( 'right' );
						},
						wipeRight			: function() {
							_navigate( 'left' );
						},
						preventDefaultEvents: false
					});
				
					$(document).bind('keyup.rgGallery', function( event ) {
						if (event.keyCode == 39)
							_navigate( 'right' );
						else if (event.keyCode == 37)
							_navigate( 'left' );	
					});
					
				}
				
			},
			_navigate		= function( dir ) {
				
				// Навигация по большим изображениям
				
				if( anim ) return false;
				anim	= true;
				
				if( dir === 'right' ) {
					if( current + 1 >= itemsCount )
						current = 0;
					else
						++current;
				}
				else if( dir === 'left' ) {
					if( current - 1 < 0 )
						current = itemsCount - 1;
					else
						--current;
				}
				
				_showImage( $items.eq( current ) );
				
			},
			_showImage		= function( $item ) {
				
				// Выводим большое изображение, которое ассоциировано с $item
				
				var $loader	= $rgGallery.find('div.rg-loading').show();
				
				$items.removeClass('selected');
				$item.addClass('selected');
					 
				var $thumb		= $item.find('img'),
					largesrc	= $thumb.data('large'),
					title		= $thumb.data('description');
				
				$('<img/>').load( function() {
					
					$rgGallery.find('div.rg-image').empty().append('<img src="' + largesrc + '"/>');
					
					if( title )
						$rgGallery.find('div.rg-caption').show().children('p').empty().text( title );
					
					$loader.hide();
					
					if( mode === 'carousel' ) {
						$esCarousel.elastislide( 'reload' );
						$esCarousel.elastislide( 'setCurrent', current );
					}
					
					anim	= false;
					
				}).attr( 'src', largesrc );
				
			};
		
		return { init : init };
	
	})();

	Gallery.init();
});