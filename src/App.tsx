/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StartScreen } from './screens/StartScreen';
import { GameScreen } from './screens/GameScreen';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/play" element={<GameScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
