import { useHistory } from 'react-router-dom'
import { Grid, Text, Button } from '../element/index'
import { useDispatch, useSelector } from 'react-redux'
import io from 'socket.io-client'
import { actionCreators as gameActions } from '../redux/modules/game'
import { actionCreators as roomActions } from '../redux/modules/room'
import { actionCreators as memberActions } from '../redux/modules/member'
import { useEffect } from 'react'
import Peer from 'peerjs';

function Loading() {
  const dispatch = useDispatch()
  const history = useHistory()
  const token = localStorage.getItem('token')
  const myPeer = new Peer();


  const entrance = () => {
    history.push('/gamemain')
    const socket = io.connect('https://sparta-dongsun.shop')
    dispatch(gameActions.sendSocket(socket))

    socket.on('roomData', (info) => {
      // createModal 이벤트 발생시 실행
      socket.emit('joinRoom', info.roomId, myPeer.id)
      dispatch(roomActions.currentRoom(info))
      dispatch(gameActions.sendPeerId(myPeer))
      history.push(`/gameroom/${info.roomId}`)
    })


    socket.on('leaveRoomMsg', (whosout, whosId) => {
      //whosId
      dispatch(memberActions.exitSocketId(whosout))
      dispatch(memberActions.exitUserId(whosId))
      dispatch(gameActions.noticeEnterOut(whosId))
    })

    socket.on('joinRoomMsg', (incoming, idValue, currentAll) => {
      // 참가자가 방에 들어올때 호출
      dispatch(memberActions.currentSocketId(idValue))
      dispatch(memberActions.currentUserId(currentAll))
      dispatch(gameActions.noticeEnterOut(incoming))
    })

    socket.on('getJob', (player, playerJob) => {
      console.log(player, playerJob)
      dispatch(gameActions.playerJob({ player, playerJob }))
      dispatch(gameActions.noticeJob(playerJob))
    })

    socket.on('isNight', (value) => {
      let time ;
      if(value == true){
        time = '밤'
        dispatch(gameActions.dayAndNight(time))
      } else { 
        time = '낮'
        dispatch(gameActions.dayAndNight(time))
      }
    })

    socket.on('dayVoteResult', (value) => {
      console.log(value)
      dispatch(gameActions.playerWhoKilled(value.diedPeopleArr))
      dispatch(gameActions.noticeResult(value.id))
    })

    socket.on('nightVoteResult', (value) => {
      console.log(value)
      dispatch(gameActions.playerWhoKilled(value.diedPeopleArr))
      dispatch(gameActions.noticeResult(value.died[0]))
      dispatch(gameActions.playerWhoSurvived(value.saved[0]))
    })

    socket.on('endGame', data => {
      console.log(data)
      dispatch(gameActions.noticeEndGame(data?.msg))
    })

    socket.on('police', (selected) => {
      console.log(selected)
      dispatch(gameActions.copSelected(selected))
      dispatch(gameActions.noticeCop(selected))
    })

    socket.on('reporter', data => { //1번 기자가 고른사람의 직업, 2번 기자가 고른사람의 아이디 3번 기자가 고른사람이 누굴 찍었는지
      console.log(data)
    }) 
    
    
  }

  return (
    <>
      <Grid width="100vw" height="100vh" bg="#eee">
        <Grid is_flex flex>
          {token ? (
            <Text
              _onClick={() => {
                entrance()
              }}
              bold
              size="32px"
            >
              게임시작
            </Text>
          ) : (
            <Grid is_flex flex>
              <Text
                _onClick={() => {
                  history.push('/login')
                }}
                bold
                size="32px"
              >
                로그인
              </Text>
              <Text
                _onClick={() => {
                  history.push('/signup')
                }}
                bold
                size="32px"
              >
                회원가입
              </Text>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  )
}
export default Loading
