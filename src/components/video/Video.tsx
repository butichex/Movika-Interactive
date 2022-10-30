import { useEffect, useRef, useState } from 'react'
import Activity from '../activity/Activity'
import actionVideo_foxAttack from '../../assets/action_fox-attack.mp4'
import actionVideo_action_passed from '../../assets/action_passed.mp4'
import actionVideo_action_failed from '../../assets/action_failed.mp4'
import actionVideo_action_2 from '../../assets/action_2.mp4'

import './Video.scss'
import TRACK_1 from '../tracks/TRACK_1'
import Poster from '../poster/Poster'

interface ScriptAction {
    track: any
    type: string
    time: number
}
interface ScriptActionInfo {
    name: string
    start: number
    time: number
    ifComplete: string
    ifFailed: string
}
interface ScriptScene {
    videoSrc: string
    currentActionIndex: number
    actionsInfo: ScriptActionInfo[]
}
interface Script {
    currentScene: string
    scenes: Map<string, ScriptScene>
    actions: Map<string, ScriptAction>
}

const script: Script = {
    currentScene: 'fox_attack',
    scenes: new Map([
        [
            'fox_attack',
            {
                videoSrc: actionVideo_foxAttack,
                currentActionIndex: 0,
                actionsInfo: [
                    {
                        name: 'swipe',
                        start: 3,
                        time: 7.2,
                        ifComplete: 'fox_attack_passed',
                        ifFailed: 'fox_attack_failed'
                    }
                ]
            }
        ],
        [
            'fox_attack_passed',
            {
                videoSrc: actionVideo_action_passed,
                currentActionIndex: 0,
                actionsInfo: [
                    {
                        name: 'swipe',
                        start: 10,
                        time: 5,
                        ifComplete: 'fox_attack_passed',
                        ifFailed: 'fox_attack_failed'
                    }
                ]
            }
        ],
        [
            'fox_attack_failed',
            {
                videoSrc: actionVideo_action_failed,
                currentActionIndex: 0,
                actionsInfo: [
                    {
                        name: 'swipe',
                        start: 10,
                        time: 5,
                        ifComplete: 'fox_attack_passed',
                        ifFailed: 'fox_attack_failed'
                    }
                ]
            }
        ]
    ]),
    actions: new Map([['swipe', { track: TRACK_1, type: 'swap', time: 0 }]])
}

function Video() {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isReady, setIsReady] = useState(false)
    const [curActivity, setCurActivity] = useState<ScriptAction | undefined>()
    const [curActivityResult, setCurActivityResult] = useState<boolean>()
    const [videoSrc, setVideoSrc] = useState(script.scenes.get(script.currentScene)?.videoSrc)

    const checkScene = (event: any) => {
        if (!isReady) return

        const scene = script.scenes.get(script.currentScene)
        const actionIndex = scene?.currentActionIndex || 0
        const actionInfo = scene?.actionsInfo[actionIndex]
        const currentTime = event.target.currentTime
        if (currentTime >= actionInfo!.start && !curActivity) {
            const action = script.actions.get(actionInfo!.name)
            action!.time = actionInfo!.time
            setCurActivity(action)
        }
    }

    useEffect(() => {
        if (!isReady) return
        if (videoRef.current!.paused) videoRef.current!.play()
        if (curActivityResult !== undefined) {
            // change scene
            const currentSceneName = script.currentScene
            const currentScene = script.scenes.get(currentSceneName)
            const currentActionInfo = currentScene?.actionsInfo[currentScene.currentActionIndex]

            const nextSceneName = curActivityResult
                ? currentActionInfo?.ifComplete
                : currentActionInfo?.ifFailed

            setCurActivity(undefined)
            if (!nextSceneName) videoRef.current!.pause()
            else {
                script.currentScene = nextSceneName
                setVideoSrc(script.scenes.get(nextSceneName)?.videoSrc)
            }
        }
    }, [isReady, curActivityResult])

    useEffect(() => {
        console.log(1)

        videoRef.current!.pause()
        setIsReady(false)
    }, [videoSrc])

    return (
        <div className="page-wrapper">
            <div className="video-holder">
                {isReady ? (
                    ''
                ) : (
                    <Poster
                        onClick={() => {
                            setIsReady(true)
                        }}
                    />
                )}
                <video autoPlay ref={videoRef} onTimeUpdate={checkScene} src={videoSrc} />
                {isReady && curActivity ? (
                    <Activity
                        track={curActivity!.track}
                        time={curActivity!.time}
                        type={curActivity!.type}
                        onResult={setCurActivityResult}
                    />
                ) : (
                    ''
                )}
            </div>
        </div>
    )
}
export default Video
