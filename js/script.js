$(document).ready(function() {
  let turn = 'tick'
  //tick or cross
  let TurnCount = '1'
  let gameover = false
  let winner = ''

  let win0_ = ['0_0', '0_1', '0_2'] // [1,1,1,0,0,0,0,0,0]
  let win1_ = ['0_0', '1_0', '2_0'] // [0,0,0,1,1,1,0,0,0]
  let win2_ = ['0_0', '1_1', '2_2'] // [0,0,0,0,0,0,1,1,1]
  let win_0 = ['0_1', '1_1', '2_1'] // [1,0,0,1,0,0,1,0,0]
  let win_1 = ['0_2', '1_2', '2_2'] // [0,1,0,0,1,0,0,1,0]
  let win_2 = ['1_0', '1_1', '1_2'] // [0,0,1,0,0,1,0,0,1]
  let win00 = ['0_2', '1_1', '2_0'] // [1,0,0,0,1,0,0,0,1]
  let win11 = ['2_0', '2_1', '2_2'] // [0,0,1,0,1,0,1,0,0]
  let winList = [win0_, win1_, win2_, win_0, win_1, win_2, win00, win11]

  $('.block').click(function(event) {
    TurnCount % 2 == 0 ? (turn = 'x') : (turn = 't')
    //console.log(event.target.id)

    var hasTick = $(this).hasClass('tick')
    var hasCross = $(this).hasClass('cross')
    if (!gameover) {
      if (!hasTick && !hasCross && turn === 't') {
        $(this).addClass('tick')
        WinCheck()
        TurnCount++
      } else if (!hasTick && !hasCross && turn === 'x') {
        $(this).addClass('cross')
        WinCheck()
        TurnCount++
      }
    } else {
      if (gameover == true) {
        showResult()
      }
    }
  })

  function WinCheck() {
    for (var i = 0; i < winList.length; i++) {
      ticks = 0
      cross = 0
      for (var j = 0; j < 3; j++) {
        var hasTick = $('#' + winList[i][j]).hasClass('tick')
        var hasCross = $('#' + winList[i][j]).hasClass('cross')

        if (hasTick) {
          ticks++
          if (ticks == 3) {
            winner = 'ticks'
            showResult()
          }
        }
        if (hasCross) {
          cross++
          if (cross == 3) {
            winner = 'cross'
            showResult()
          }
        }

        //console.log('ticks= ' + ticks)
        //console.log('crosses' + cross)

        if (winner != '') gameover = true
        //console.log('Winner : ' + winner)
        //console.log('gamerover : ' + gameover)
      }
      console.log('+++++++++++++++++++++')
    }
  }

  function showResult() {
    console.log('Game Over! ' + winner + ' Win')
  }
})
