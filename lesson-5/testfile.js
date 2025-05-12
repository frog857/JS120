const positions = {
  1: [2, 2, 1, 3], 2: [8, 8, 7, 9], 3: [14, 14, 13, 16],
  4: [2, 2, 1, 3], 5: [8, 8, 7, 9], 6: [14, 14, 13, 16],
  7: [2, 2, 1, 3], 8: [8, 8, 7, 9], 9: [14, 14, 13, 16]
};

for (let square in positions) {
  console.log(square, positions[square]);
}