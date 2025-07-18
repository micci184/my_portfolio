'use client';

import { useState, useEffect, TouchEvent } from 'react';

interface SwipeOptions {
  minDistance?: number;  // スワイプと判定する最小距離
  maxTime?: number;      // スワイプと判定する最大時間（ミリ秒）
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

interface SwipeState {
  touchStart: { x: number; y: number; time: number } | null;
  touchEnd: { x: number; y: number; time: number } | null;
}

/**
 * スワイプジェスチャーを検出するカスタムフック
 */
export function useSwipeGesture(options: SwipeOptions = {}) {
  const {
    minDistance = 50,
    maxTime = 500,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
  } = options;

  const [swipeState, setSwipeState] = useState<SwipeState>({
    touchStart: null,
    touchEnd: null,
  });

  // タッチ開始時の処理
  const handleTouchStart = (e: TouchEvent) => {
    setSwipeState({
      ...swipeState,
      touchStart: {
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY,
        time: Date.now(),
      },
      touchEnd: null,
    });
  };

  // タッチ移動時の処理
  const handleTouchMove = (e: TouchEvent) => {
    setSwipeState({
      ...swipeState,
      touchEnd: {
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY,
        time: Date.now(),
      },
    });
  };

  // タッチ終了時の処理
  const handleTouchEnd = () => {
    const { touchStart, touchEnd } = swipeState;
    
    // タッチ開始または終了が記録されていない場合は処理しない
    if (!touchStart || !touchEnd) return;
    
    // スワイプ時間を計算
    const timeElapsed = touchEnd.time - touchStart.time;
    
    // 最大時間を超えている場合はスワイプと判定しない
    if (timeElapsed > maxTime) return;
    
    // X軸とY軸の移動距離を計算
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    
    // 水平方向のスワイプが垂直方向より大きい場合
    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      if (Math.abs(distanceX) > minDistance) {
        // 左スワイプ
        if (distanceX > 0 && onSwipeLeft) {
          onSwipeLeft();
        }
        // 右スワイプ
        else if (distanceX < 0 && onSwipeRight) {
          onSwipeRight();
        }
      }
    } 
    // 垂直方向のスワイプが水平方向より大きい場合
    else {
      if (Math.abs(distanceY) > minDistance) {
        // 上スワイプ
        if (distanceY > 0 && onSwipeUp) {
          onSwipeUp();
        }
        // 下スワイプ
        else if (distanceY < 0 && onSwipeDown) {
          onSwipeDown();
        }
      }
    }
    
    // スワイプ状態をリセット
    setSwipeState({
      touchStart: null,
      touchEnd: null,
    });
  };

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}