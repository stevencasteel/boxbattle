const STRIDE = 9;

self.onmessage = function (e) {
  const { type, buffer, dt } = e.data;

  if (type === "UPDATE") {
    const data = new Float32Array(buffer);
    const len = data.length;

    for (let i = 0; i < len; i += STRIDE) {
      if (data[i + 8] === 0.0) continue;

      data[i + 4] -= dt;
      if (data[i + 4] <= 0) {
        data[i + 8] = 0.0;
        continue;
      }

      const drag = data[i + 6];
      if (drag !== 1.0) {
        data[i + 2] *= drag;
        data[i + 3] *= drag;
      }

      const turbulence = data[i + 7];
      if (turbulence > 0) {
        const life = data[i + 4];
        const x = data[i];
        const wave = Math.sin(life * 22.0 + x * 0.02) * turbulence;
        data[i] += wave * dt;
      }

      data[i] += data[i + 2] * dt;
      data[i + 1] += data[i + 3] * dt;
    }

    self.postMessage({ type: "UPDATE_COMPLETE", buffer }, [buffer]);
  }
};
