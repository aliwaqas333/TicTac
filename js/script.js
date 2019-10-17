$(document).ready(function() {
  $('#exampleModalCenter').modal('show')
  let turn = 'tick'
  //tick or cross
  let TurnCount = '1'
  let gameover = false
  let winner = ''
  let GamesPlayed = 1
  let gameTied = false
  let win0_ = ['0_0', '0_1', '0_2'] // [1,1,1,0,0,0,0,0,0]
  let win1_ = ['0_0', '1_0', '2_0'] // [0,0,0,1,1,1,0,0,0]
  let win2_ = ['0_0', '1_1', '2_2'] // [0,0,0,0,0,0,1,1,1]
  let win_0 = ['0_1', '1_1', '2_1'] // [1,0,0,1,0,0,1,0,0]
  let win_1 = ['0_2', '1_2', '2_2'] // [0,1,0,0,1,0,0,1,0]
  let win_2 = ['1_0', '1_1', '1_2'] // [0,0,1,0,0,1,0,0,1]
  let win00 = ['0_2', '1_1', '2_0'] // [1,0,0,0,1,0,0,0,1]
  let win11 = ['2_0', '2_1', '2_2'] // [0,0,1,0,1,0,1,0,0]
  let winList = [win0_, win1_, win2_, win_0, win_1, win_2, win00, win11]

  let Board1 = ['0_0', '0_1', '0_2']
  let Board2 = ['1_0', '1_1', '1_2']
  let Board3 = ['2_0', '2_1', '2_2']
  let Board = [Board1, Board2, Board3]

  $('.block').click(function(event) {
    //TurnCount % 2 == 0 ? (turn = 'x') : (turn = 't')
    //console.log(event.target.id)

    var hasTick = $(this).hasClass('tick')
    var hasCross = $(this).hasClass('cross')
    if (!gameover || !gameTied) {
      if (!hasTick && !hasCross) {
        $(this).addClass('tick')
        $(this).removeClass('empty')
        WinCheck()
        TurnCount++
        AiTurn()
      }
    } else {
      if (gameover == true) {
        showResult()
      }

      //   else if (!hasTick && !hasCross && turn === 'x') {
      //   $(this).addClass('cross')
      //   $(this).removeClass('empty')
      //   WinCheck()
      //   TurnCount++
      // }
    }
  })

  function WinCheck() {
    for (var i = 0; i < winList.length; i++) {
      ticks = 0
      cross = 0
      console.log('ROW : ' + i)

      for (var j = 0; j < 3; j++) {
        var hasTick = $('#' + winList[i][j]).hasClass('tick')
        var hasCross = $('#' + winList[i][j]).hasClass('cross')

        if (hasTick) {
          ticks++
          if (ticks == 3) {
            winner = 'ticks'

            $('#' + winList[i][j - 1]).addClass('winblock')
            $('#' + winList[i][j - 2]).addClass('winblock')
            $('#' + winList[i][j]).addClass('winblock')
            // $('#WhoWon').html(winner)
            showResult()
          }
        }
        if (hasCross) {
          cross++
          if (cross == 3) {
            winner = 'cross'
            $('#' + winList[i][j - 1]).addClass('winblock')
            $('#' + winList[i][j - 2]).addClass('winblock')
            $('#' + winList[i][j]).addClass('winblock')
            // $('#crossWon').css('display', 'block')
            showResult()
          }
        }

        // console.log('ticks= ' + ticks)
        // console.log('crosses' + cross)
        checkTie()

        if (winner != '') {
          gameover = true
          showResult()
        }

        //console.log('Winner : ' + winner)
        //console.log('gamerover : ' + gameover)
      }
      // console.log('+++++++++++++++++++++')
    }
  }

  function showResult() {
    if (winner != '') {
      $('#WhoWon').html('Game Over! ' + winner + ' Win')

      console.log('Game Over! ' + winner + ' Win')
      $('#TryAgain').modal('show')
    }
  }
  function AiTurn() {
    var id = '#' + bestSpot()
    $(id).removeClass('empty')
    $(id).addClass('cross')
    TurnCount++
    WinCheck()
  }
  function bestSpot() {
    //Ai Player plays here
    var id = randomEmpty()
    return id
  }
  function randomEmpty() {
    for (var i = 0; i < Board.length; i++) {
      for (var j = 0; j < Board[i].length; j++) {
        if ($('#' + Board[i][j]).hasClass('empty')) {
          console.log('empty random spot' + Board[i][j])
          return Board[i][j]
        }
      }
    }
  }
  function TryAgain() {
    GamesPlayed++
    $('.block').removeClass('tick')
    $('.block').removeClass('cross')
    alert()
  }
  function checkTie() {
    tiecount = 0
    if (!gameover) {
      for (var i = 0; i < Board.length; i++) {
        for (var j = 0; j < Board[i].length; j++) {
          if ($('#' + Board[i][j]).hasClass('empty')) {
            tiecount++
          }
        }
      }
      if (tiecount == 0) {
        gameTied = true
        gameover = true
        winner = 'No One'
        console.log('Game Tied')
      }
    }
  }
})
