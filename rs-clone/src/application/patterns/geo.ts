declare global {
    interface Window {
        initMap: () => void;
    }
}

export function initMap(): void {
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: { lat: 20, lng: 0 },
        zoom: 2.2,
        mapId: 'f3695c8185093af4',
    });

    _createMarker(
        map,
        { lat: -23.363, lng: 131.044 },
        'Австралия',
        'Австралия является мировым лидером по запасам урана.'
    );
    _createMarker(map, { lat: 64, lng: 93 }, 'Россия', 'Россия граничит с 16 странами.');
    _createMarker(
        map,
        { lat: 38, lng: 103 },
        'Китай',
        'В Китае насчитывается сразу четыре мегаполиса с населением свыше 10 миллионов человек. Это больше, чем в любой другой стране мира.'
    );
    _createMarker(
        map,
        { lat: 42, lng: -101 },
        'США',
        'Ежегодно на США обрушивается порядка 800 разрушительных торнадо.'
    );
    _createMarker(
        map,
        { lat: -5, lng: -56 },
        'Бразилия',
        'В Бразилии расположено сразу два из 7 современных чудес света – статуя Христа, возвышающаяся над Рио-де-Жанейро, и река Амазонка.'
    );
    _createMarker(
        map,
        { lat: 67, lng: -46 },
        'Гренландия',
        'Лучшее место на земле для наблюдения за северным сиянием.'
    );
    _createMarker(
        map,
        { lat: -28, lng: 24 },
        'Южная Африка',
        'Самые древние останки ископаемого человека были обнаружены здесь.'
    );
    _createMarker(
        map,
        { lat: 14, lng: -8 },
        'Мали',
        'Единственный в Мали университет был закрыт из-за недостатка студентов.'
    );
    _createMarker(map, { lat: 30, lng: 28 }, 'Египет', 'Более 95% всей египетской территории — бесплодные пустыни.');
    _createMarker(map, { lat: 49, lng: 2 }, 'Франция', 'Красное вино в этой стране более популярно, нежели белое.');
    _createMarker(
        map,
        { lat: 51, lng: 32 },
        'Украина',
        'Украина по собственной инициативе отказалась от третьего в мире по величине арсенала ядерного оружия.'
    );
    _createMarker(
        map,
        { lat: 66, lng: 16 },
        'Швеция',
        'Столица Швеции, Стокгольм, располагается на четырнадцати островах.'
    );
    _createMarker(
        map,
        { lat: 51, lng: -71 },
        'Канада',
        'Граница между Соединенными Штатами и Канадой – самая длинная из существующих на планете.'
    );
    _createMarker(
        map,
        { lat: -30, lng: -66 },
        'Аргентина',
        'В Аргентине живет множество потомков людей, сбежавших из России перед революцией и сразу после нее.'
    );
    _createMarker(
        map,
        { lat: 51, lng: 68 },
        'Казахстан',
        'Средняя плотность населения в Казахстане ненамного выше, чем в Сибири — около 6 человек на квадратный километр.'
    );
}

function _createMarker(map: google.maps.Map, position: { lat: number; lng: number }, title: string, content: string) {
    const contentString = `
        <div id="content">
          <div id="siteNotice"></div>
          <h1 id="firstHeading" class="firstHeading">${title}</h1>
          <div id="bodyContent">
            <p>${content}</p>
          </div>
        </div>`;
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
        ariaLabel: title,
    });
    const marker = new google.maps.Marker({
        position: position,
        map,
        title: title,
    });

    marker.addListener('click', () => {
        infowindow.open({
            anchor: marker,
            map,
        });
    });
}
