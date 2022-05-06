import { useSelector } from "react-redux"
import styled from "styled-components"
import { Grid, Button, Text } from '../../element/index'

function NotiModal() {
    const voteResult = useSelector((state) => state.game.resultNoti)
    const endGameNoti = useSelector((state) => state.game.endGameNoti)
    const survivedNoti = useSelector((state) => state.game.survived)
    const currentTime = useSelector((state) => state.game.night)
    return (
        <>
        {/* <Noti>
            <Grid is_flex bg='#eee'>
                <Grid center height='100%'>
                    <Grid height='10%'>
                        <Text>특종</Text>
                    </Grid>
                    <Grid is_flex height='50%'>
                        <Grid >
                            <Text>그림이 들어감</Text>
                        </Grid>
                        <Grid >
                            <Text>리포터의 내용이 들어감</Text>
                        </Grid>
                    </Grid>
                    <Grid height='40%'>
                        <Text>
                        There are many variations of passages of Lorem Ipsum available, 
                        but the majority have suffered alteration in some form, by injected humour, 
                        or randomised words which don't look even slightly believable. 
                        If you are going to use a passage of Lorem Ipsum, you need to be sure 
                        there isn't anything embarrassing hidden in the middle of text. 
                        All the Lorem Ipsum generators on the Internet tend to repeat predefined 
                        chunks as necessary, 
                        </Text>
                    </Grid>
                </Grid>
                <Grid>
                    <Grid height='30%'>
                        <Text>이 밤의 피해자</Text>
                    </Grid>
                    <Grid height='30%'>
                        <Text>의사가 살린사람</Text>
                    </Grid>
                </Grid>
            </Grid>
        </Noti> */}
        {
            endGameNoti // 게임이 끝났냐 안끝났냐
            ? <Noti>{endGameNoti}</Noti>
            : <>
                {
                    currentTime == '밤' // 밤이면 낮의 결과가 출력
                    ? <Noti>
                        <Text>{voteResult}</Text>
                    </Noti>
                    : <Noti>
                    <Grid is_flex bg='#eee'>
                        <Grid center height='100%'>
                            <Grid height='10%'>
                                <Text>특종</Text>
                            </Grid>
                            <Grid is_flex height='50%'>
                                <Grid >
                                    <Text>그림이 들어감</Text>
                                </Grid>
                                <Grid >
                                    <Text>리포터의 내용이 들어감</Text>
                                </Grid>
                            </Grid>
                            <Grid height='40%'>
                                <Text>
                                There are many variations of passages of Lorem Ipsum available, 
                                but the majority have suffered alteration in some form, by injected humour, 
                                or randomised words which don't look even slightly believable. 
                                If you are going to use a passage of Lorem Ipsum, you need to be sure 
                                there isn't anything embarrassing hidden in the middle of text. 
                                All the Lorem Ipsum generators on the Internet tend to repeat predefined 
                                chunks as necessary, 
                                </Text>
                            </Grid>
                        </Grid>
                        <Grid>
                            <Grid height='30%'>
                                <Text>이 밤의 피해자</Text>
                                <Text>{voteResult}</Text>
                            </Grid>
                            <Grid height='30%'>
                                <Text>의사가 살린사람</Text>
                                <Text>{survivedNoti}</Text>
                            </Grid>
                        </Grid>
                    </Grid>
                </Noti>
                }
            </>
        }
        </>
    )
}
const Noti = styled.div`
  display: inline-block;
  background: white;
  margin-top: 100px;
  width: 50%;
  height: 600px;
  padding: 40px;
  box-sizing: border-box;
  border-radius: 20px;
  box-shadow: 2px 2px 2px 2px #d2d2d2;
  `

export default NotiModal