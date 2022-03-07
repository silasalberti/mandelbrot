import streamlit as st
import numpy as np
import math
import matplotlib.pyplot as plt

n = st.slider("Grid size", 50, 1000, 50)
iterations = st.slider("Iterations", 5, 50, 10)

midpointx = st.slider("Midpoint X", -2.0, 2.0, 0.0)
midpointy = st.slider("Midpoint Y", -2.0, 2.0, 0.0)
zoom = st.slider("Zoom factor", 0, 10, 1)

grid = np.ones((n, n))

for i in range(n):
    for j in range(n):
        iter = 0
        z0 = complex(
            midpointx - 2 / math.exp(zoom) + 4 / math.exp(zoom) * j / n,
            midpointy - 2 / math.exp(zoom) + 4 / math.exp(zoom) * i / n,
        )
        z = z0
        while iter < iterations:
            z = z**2 + z0
            if abs(z) > 2:
                grid[i, j] = iter / iterations
                iter = iterations
            iter += 1

print(grid)

fig, ax = plt.subplots()
ax.imshow(grid)
plt.axis("off")
st.pyplot(fig)
