// 1文字ごとの情報を管理するクラス
class CharItem {
  element: HTMLElement;
  y: number;            // 縦の位置
  speed: number;        // 落ちるスピード
  
  // ★追加: 個性パラメータ
  bounce: number;       // 跳ね返る強さ（0.5〜0.9くらい）
  rotation: number;     // 今の角度
  rotationSpeed: number;// 回転する速さ

  constructor(element: HTMLElement) {
    this.element = element;
    
    // ★変更1: スタート位置をバラバラにする
    // -100px 〜 -1000px の間でランダム
    // これにより、「F」はすぐ落ちてくるけど「L」は遅れてくる、といった差が出ます
    this.y = -100 - Math.random() * 900;
    
    // ★変更2: 初速も少しランダムに
    this.speed = Math.random() * 5;

    // ★変更3: 跳ね返る強さをランダムに
    // -0.4 (重い) 〜 -0.8 (スーパーボール)
    this.bounce = -0.3 - Math.random() * 0.3;

    // ★変更4: 回転の初期設定
    this.rotation = Math.random() * 360; // 最初から傾いてたりする
    this.rotationSpeed = (Math.random() - 0.5) * 10; // 左回転か右回転かランダム
  }
}

// 全体を指揮するマネージャー
export class FallingManager {
  private items: CharItem[] = [];
  private isRunning = false;

  constructor(elements: (HTMLElement | null)[]) {
    elements.forEach((el) => {
      if (el) {
        this.items.push(new CharItem(el));
      }
    });
  }

  start() {
    this.isRunning = true;
    this.loop();
  }

  stop() {
    this.isRunning = false;
  }

  private loop = () => {
    if (!this.isRunning) return;

    this.items.forEach((item) => {
      // 1. 重力（加速）
      item.speed += 0.5; 
      
      // 2. 位置の更新
      item.y += item.speed;
      
      // 3. 回転の更新（★追加）
      item.rotation += item.rotationSpeed;

      // 4. 床の判定
      // window.innerHeight で動的に床の位置を取得
      const floor = window.innerHeight - 300; // 文字サイズ分くらい引いておく

      if (item.y > floor) { 
        item.y = floor;
        
        // ★変更: 定数ではなく、その子の「bounce（個性）」を使って跳ね返す
        item.speed *= item.bounce; 
        
        // 床についたら摩擦で回転も遅くする（芸が細かいポイント）
        item.rotationSpeed *= 0.9;

        // 完全に止める判定（震え防止）
        if (Math.abs(item.speed) < 1) {
             item.speed = 0;
        }
        if (Math.abs(item.rotationSpeed) < 0.1) {
            item.rotationSpeed = 0;
        }
      }

      // 5. 描画反映（回転も加える）
      // rotate(${item.rotation}deg) を追加
      item.element.style.transform = `translateY(${item.y}px) rotate(${item.rotation}deg)`;
    });

    requestAnimationFrame(this.loop);
  };
}