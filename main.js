;(function () {
  //глобальные переменные:
  // cnt-кол-во карт по горизонтали/вертикали, берется из формы
  let cnt = document.querySelector('#numCol'),
    cardId1 = 0,
    cardText1 = '',
    cardId2 = 0,
    cardText2 = '',
    counter = 0

  //cardId1-запоминаем идентификатор первой открытой карты
  // cardText1-запоминаем содержимое первой открытой карты
  //аналогично для второй открытой карты
  // counter-счетчик для числа открытых карт

  //функция, генерирующая массив парных чисел
  function createNumbersArray(cnt) {
    let nArray = []

    for (i = 0; i < Math.pow(cnt, 2) / 2; i++) {
      nArray.push(i + 1)
      nArray.push(i + 1)
    }
    return nArray
  }

  //функция, перемешивающая массив парных чисел
  function shuffle(arr) {
    arr.sort(() => Math.random() - 0.5)
  }
  // функция установки таймера
  function setTimer() {
    setTimeout(() => {
      alert('Игра закончена')
      window.location.reload()
    }, 60 * 1000)
  }
  function setDefault(cnt) {
    if (counter == Math.pow(cnt, 2) / 2) {
      const wrapper = document.createElement('div')
      wrapper.classList.add('d-flex', 'justify-content-center')
      document.body.append(wrapper)
      const buttonBegin = document.createElement('button')
      buttonBegin.textContent = 'Сыграть снова'

      buttonBegin.addEventListener('click', () => {
        window.location.reload()
      })
      wrapper.append(buttonBegin)
    }
  }
  //

  function setCard(crt, crtText, cntVal) {
    if (!cardText1 && !cardText2) {
      cardId1 = crt
      cardText1 = crtText
    } else {
      if (!cardText2 && cardText1) {
        cardId2 = crt
        cardText2 = crtText
      } else {
        changeColor(crt, crtText, cntVal)
      }
    }
  }
  function changeColor(crt, crText, cntVal) {
    if (cardText1 !== cardText2) {
      //если открытые карты не совпадают, их цвет меняется на черный
      document.getElementById(cardId1).style =
        'border:2px solid red;background:black;width:50px;'
      document.getElementById(cardId2).style =
        'border:2px solid red;background:black;width:50px;'
    } else {
      counter++
      if (counter == cntVal ** 2 / 2 - 1) {
        counter++
      }
    }
    cardId1 = crt
    cardText1 = crText
    cardId2 = 0
    cardText2 = ''
  }

  //основная функция
  function startgame(count) {
    //numArray-массив парных чисел
    let numArray = []

    //butStart-кнопка начала игры из формы
    const butStart = document.querySelector('#butS')

    //при нажатии кнопки игра запускается
    butStart.addEventListener('click', () => {
      //установка таймера на 1 мин, вывод сообщения, сброс к первоначальным установкам
      setTimer()

      //формирование массива значений карт в зависимости от кол-ва карт по горизонтали/вертикали
      if (!count.value % 2 || count.value > 10 || !count.value) {
        count.value = 4
      }

      numArray = createNumbersArray(count.value)
      shuffle(numArray)

      //к-индекс массива значений карт
      let k = 0

      //выводим в цикле по строкам карты на экран
      for (j = 0; j < parseInt(count.value); j++) {
        //wrapper-div -блок, куда помещаем строку карт
        let wrapper = document.createElement('div')
        wrapper.classList.add('d-flex', 'justify-content-center')
        document.body.append(wrapper)

        //в цикле создаем строку карт, каждая карта-кнопка, имеющая уникальный идентификатор, первоначальная окраска в черный цвет
        //при нажатии цвет меняется на белый.
        for (i = 0; i < parseInt(count.value); i++) {
          let cart = document.createElement('button')
          cart.style = 'border:2px solid red;background:black;width:50px;'
          cart.textContent = numArray[k]
          k++
          cart.id = Math.random()

          //добавляем событие клик по нажатию карты
          cart.addEventListener('click', () => {
            if (cart.style.background != 'white') {
              //если все карты открыты, то выводим кнопку buttonBegin, которая сбрасывает игру на начальный уровень
              setDefault(count.value)

              //устанавливаем белый цвет для открытой карты
              cart.style = 'border:2px solid red;background:white;width:50px;'

              //проверяем условия совпадения двух последовательно открытых карт
              //заносим идентификаторы и содержимое открытых карт в глобальные переменные
              setCard(cart.id, cart.textContent, count.value)
            }
          })
          wrapper.append(cart)
        }
      }
    })
  }

  startgame(cnt)
})()
