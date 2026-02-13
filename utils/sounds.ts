
export const playSound = (type: 'pop' | 'jump' | 'sparkle' | 'paper' | 'ding') => {
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;
  
  const ctx = new AudioContextClass();
  const masterGain = ctx.createGain();
  masterGain.connect(ctx.destination);
  masterGain.gain.value = 0.2;

  const now = ctx.currentTime;

  switch (type) {
    case 'pop': {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start();
      osc.stop(now + 0.1);
      break;
    }
    case 'jump': {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.15);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start();
      osc.stop(now + 0.15);
      break;
    }
    case 'sparkle': {
      const frequencies = [880, 1174, 1318, 1760];
      frequencies.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = f;
        const start = now + i * 0.05;
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.2, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.01, start + 0.3);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(start);
        osc.stop(start + 0.3);
      });
      break;
    }
    case 'paper': {
      const bufferSize = ctx.sampleRate * 0.2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1000;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);
      noise.start();
      break;
    }
    case 'ding': {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start();
      osc.stop(now + 0.5);
      break;
    }
  }
};
