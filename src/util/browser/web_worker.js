// @flow

import window from '../window';
import goongjs from '../../';

import type {WorkerInterface} from '../web_worker';

export default function (): WorkerInterface {
    return (new window.Worker(goongjs.workerUrl): any);
}
