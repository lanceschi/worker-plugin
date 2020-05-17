/**
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import WorkerPlugin from '../src';
import { runWebpack, CountApplyWebpackPlugin, watchWebpack, statsWithAssets, sleep } from './_util';

jest.setTimeout(30000);

describe('worker-plugin', () => {
  test('exports a class', () => {
    expect(WorkerPlugin).toBeInstanceOf(Function);
    const inst = new WorkerPlugin();
    expect(inst).toBeInstanceOf(WorkerPlugin);
    expect(inst).toHaveProperty('apply', expect.any(Function));
  });

  test('it replaces Worker constructor with require(worker-loader)', async () => {
    const stats = await runWebpack('basic', {
      plugins: [
        new WorkerPlugin()
      ]
    });

    const assetNames = Object.keys(stats.assets);
    expect(assetNames).toHaveLength(2);
    expect(assetNames).toContainEqual('0.worker.js');

    const main = stats.assets['main.js'];
    expect(main).toMatch(/[^\n]*new\s+Worker\s*\([^)]*\)[^\n]*/g);
    expect(main).toMatch(/module.exports = __webpack_require__\.p\s*\+\s*"0\.worker\.js"/g);
  });

});
