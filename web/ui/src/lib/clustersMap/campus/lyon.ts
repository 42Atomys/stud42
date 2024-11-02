import { Campus } from '../campus';
import { Cluster } from '../cluster';
import { ICampus } from '../types';

//
export class Lyon extends Campus implements ICampus {
  emoji = (): string => '🇫🇷';

  name = (): string => 'Lyon';

  extractorRegexp = (): RegExp =>
    /(?<clusterWithLetter>z(?<cluster>\d+))(?<rowWithLetter>r(?<row>\d+))(?<workspaceWithLetter>p(?<workspace>\d+))/i;

  clusters(): Cluster[] {
    return [
      new Cluster({
        identifier: 'io-z1',
        name: 'z1',
        //prettier-ignore
        map:[
          ['T:r1' , 'PW'       , 'W:z1r1p4' , 'PW'       , 'PW'       , 'PW'       , 'T:r1' ],
          ['T:r2' , 'PW'       , 'PW'       , 'PW'       , 'PW'       , 'PW'       , 'T:r2' ],
          ['T:r3' , 'W:z1r3p5' , 'W:z1r3p4' , 'PW'       , 'W:z1r3p2' , 'W:z1r3p1' , 'T:r3' ],
          ['T:r4' , 'W:z1r4p5' , 'W:z1r4p4' , 'W:z1r4p3' , 'W:z1r4p2' , 'PW'       , 'T:r4' ],
          ['T:r5' , 'W:z1r5p5' , 'W:z1r5p4' , 'PW'       , 'W:z1r5p2' , 'W:z1r5p1' , 'T:r5' ],
          ['T:r6' , 'W:z1r6p5' , 'W:z1r6p4' , 'W:z1r6p3' , 'W:z1r6p2' , 'W:z1r6p1' , 'T:r6' ],
          ['T:r7' , 'W:z1r7p5' , 'W:z1r7p4' , 'W:z1r7p3' , 'W:z1r7p2' , 'W:z1r7p1' , 'T:r7' ],
          ['T:r8' , 'W:z1r8p5' , 'W:z1r8p4' , 'W:z1r8p3' , 'W:z1r8p2' , 'W:z1r8p1' , 'T:r8' ],
          ['T:r9' , 'W:z1r9p5' , 'W:z1r9p4' , 'PW'       , 'W:z1r9p2' , 'W:z1r9p1' , 'T:r9' ],
          ['T:r10', 'W:z1r10p5', 'W:z1r10p4', 'W:z1r10p3', 'W:z1r10p2', 'W:z1r10p1', 'T:r10'],
          ['T:r11', 'W:z1r11p5', 'W:z1r11p4', 'W:z1r11p3', 'W:z1r11p2', 'W:z1r11p1', 'T:r11'],
          ['T:r12', 'W:z1r12p5', 'PW'       , 'W:z1r12p3', 'PW'       , 'W:z1r12p1', 'T:r12'],
        ],
      }),
      new Cluster({
        identifier: 'io-z2',
        name: 'z2',
        //prettier-ignore
        map:[
          ['T:r1' , 'W:z2r1p8' , 'W:z2r1p7' , 'PW'       , 'PW'       , 'PW'       , 'PW'       , 'PW'       , 'PW'       , 'T:r1' ],
          ['T:r2' , 'W:z2r2p8' , 'W:z2r2p7' , 'W:z2r2p6' , 'W:z2r2p5' , 'W:z2r2p4' , 'W:z2r2p3' , 'W:z2r2p2' , 'W:z2r2p1' , 'T:r2' ],
          ['T:r3' , 'W:z2r3p8' , 'W:z2r3p7' , 'W:z2r3p6' , 'W:z2r3p5' , 'W:z2r3p4' , 'W:z2r3p3' , 'W:z2r3p2' , 'W:z2r3p1' , 'T:r3' ],
          ['T:r4' , 'W:z2r4p8' , 'W:z2r4p7' , 'W:z2r4p6' , 'W:z2r4p5' , 'W:z2r4p4' , 'W:z2r4p3' , 'W:z2r4p2' , 'W:z2r4p1' , 'T:r4' ],
          ['T:r5' , 'W:z2r5p8' , 'W:z2r5p7' , 'W:z2r5p6' , 'W:z2r5p5' , 'PW'       , 'W:z2r5p3' , 'W:z2r5p2' , 'W:z2r5p1' , 'T:r5' ],
          ['T:r6' , 'W:z2r6p8' , 'W:z2r6p7' , 'W:z2r6p6' , 'W:z2r6p5' , 'W:z2r6p4' , 'W:z2r6p3' , 'W:z2r6p2' , 'W:z2r6p1' , 'T:r6' ],
          ['T:r7' , 'PW'       , 'PW'       , 'W:z2r7p6' , 'PW'       , 'W:z2r7p4' , 'PW'       , 'PW'       , 'PW'       , 'T:r7' ],
          ['T:r8' , 'W:z2r8p8' , 'W:z2r8p7' , 'W:z2r8p6' , 'W:z2r8p5' , 'W:z2r8p4' , 'W:z2r8p3' , 'W:z2r8p2' , 'PW'       , 'T:r8' ],
          ['T:r9' , 'W:z2r9p8' , 'W:z2r9p7' , 'W:z2r9p6' , 'W:z2r9p5' , 'PW'       , 'W:z2r9p3' , 'W:z2r9p2' , 'W:z2r9p1' , 'T:r9' ],
          ['T:r10', 'W:z2r10p8', 'W:z2r10p7', 'W:z2r10p6', 'W:z2r10p5', 'W:z2r10p4', 'PW'       , 'W:z2r10p2', 'W:z2r10p1', 'T:r10'],
          ['T:r11', null       , 'PW'       , 'W:z2r11p6', 'PW'       , 'W:z2r11p4', 'PW'       , 'W:z2r11p2', 'PW'       , 'T:r11'],
          ['T:r12', null       , 'PW'       , 'W:z2r12p6', 'PW'       , 'W:z2r12p4', 'PW'       , 'W:z2r12p2', 'PW'       , 'T:r12'],
        ],
      }),
      new Cluster({
        identifier: 'discovery-z3',
        name: 'z3',
        //prettier-ignore
        map:[
          ['T:r1' , null       , null       , 'PW'       , 'PW'       , 'PW'       , 'PW'       , 'T:r1' ],
          ['T:r2' , 'W:z3r2p6' , 'W:z3r2p5' , 'W:z3r2p4' , 'W:z3r2p3' , 'W:z3r2p2' , 'W:z3r2p1' , 'T:r2' ],
          ['T:r3' , 'W:z3r3p6' , 'W:z3r3p5' , 'W:z3r3p4' , 'W:z3r3p3' , 'W:z3r3p2' , 'W:z3r3p1' , 'T:r3' ],
          ['T:r4' , 'W:z3r4p6' , 'W:z3r4p5' , 'W:z3r4p4' , 'W:z3r4p3' , 'W:z3r4p2' , 'W:z3r4p1' , 'T:r4' ],
          ['T:r5' , 'W:z3r5p6' , 'W:z3r5p5' , 'W:z3r5p4' , 'PW'       , 'W:z3r5p2' , 'W:z3r5p1' , 'T:r5' ],
          ['T:r6' , 'W:z3r6p6' , 'W:z3r6p5' , 'W:z3r6p4' , 'W:z3r6p3' , 'W:z3r6p2' , 'W:z3r6p1' , 'T:r6' ],
          ['T:r7' , 'PW'       , 'PW'       , 'PW'       , 'PW'       , 'PW'       , 'PW'       , 'T:r7' ],
          ['T:r8' , 'W:z3r8p6' , 'W:z3r8p5' , 'W:z3r8p4' , 'W:z3r8p3' , 'W:z3r8p2' , 'W:z3r8p1' , 'T:r8' ],
          ['T:r9' , 'W:z3r9p6' , 'W:z3r9p5' , 'W:z3r9p4' , 'PW'       , 'W:z3r9p2' , 'W:z3r9p1' , 'T:r9' ],
          ['T:r10', 'W:z3r10p6', 'PW'       , 'PW'       , 'W:z3r10p3', 'PW'       , 'W:z3r10p1', 'T:r10'],
          ['T:r11', 'PW'       , 'W:z3r11p5', 'PW'       , 'W:z3r11p3', 'PW'       , 'W:z3r11p1', 'T:r11'],
          ['T:r12', 'PW'       , 'W:z3r12p5', 'PW'       , 'W:z3r12p3', 'PW'       , 'W:z3r12p1', 'T:r12'],
          ['T:r13', null       , null       , null       , 'W:z3r13p3', 'PW'       , 'W:z3r13p1', 'T:r13'],
        ],
      }),
      new Cluster({
        identifier: 'discovery-z4',
        name: 'z4',
        //prettier-ignore
        map:[
          ['T:rx' , 'W:z4rxp7' , 'W:z4rxp6' , 'W:z4rxp5' , 'W:z4rxp4' , 'W:z4rxp3' , 'W:z4rxp2' , 'W:z4rxp1' , 'T:rx' ],
          ['T:r1' , 'W:z4r1p7' , 'PW'       , 'W:z4r1p5' , 'PW'       , 'PW'       , 'PW'       , 'W:z4r1p1' , 'T:r1' ],
          ['T:r2' , 'W:z4r2p7' , 'W:z4r2p6' , 'W:z4r2p5' , 'W:z4r2p4' , 'W:z4r2p3' , 'W:z4r2p2' , 'W:z4r2p1' , 'T:r2' ],
          ['T:r3' , 'W:z4r3p7' , 'W:z4r3p6' , 'W:z4r3p5' , 'W:z4r3p4' , 'W:z4r3p3' , 'W:z4r3p2' , 'W:z4r3p1' , 'T:r3' ],
          ['T:r4' , 'W:z4r4p7' , 'W:z4r4p6' , 'W:z4r4p5' , 'W:z4r4p4' , 'W:z4r4p3' , 'W:z4r4p2' , 'W:z4r4p1' , 'T:r4' ],
          ['T:r5' , 'W:z4r5p7' , 'PW'       , 'W:z4r5p5' , 'PW'       , 'PW'       , 'W:z4r5p2' , 'PW'       , 'T:r5' ],
          ['T:r6' , 'W:z4r6p7' , 'W:z4r6p6' , 'W:z4r6p5' , 'W:z4r6p4' , 'W:z4r6p3' , 'W:z4r6p2' , 'W:z4r6p1' , 'T:r6' ],
          ['T:r7' , 'PW'       , 'PW'       , 'PW'       , 'PW'       , 'PW'       , 'PW'       , 'PW'       , 'T:r7' ],
          ['T:r8' , 'W:z4r8p7' , 'PW'       , 'W:z4r8p5' , 'PW'       , 'W:z4r8p3' , 'PW'       , 'W:z4r8p1' , 'T:r8' ],
          ['T:r9' , 'W:z4r9p7' , 'PW'       , 'W:z4r9p5' , 'PW'       , 'PW'       , 'PW'       , 'W:z4r9p1' , 'T:r9' ],
          ['T:r10', 'W:z4r10p7', 'PW'       , 'W:z4r10p5', 'PW'       , 'W:z4r10p3', 'PW'       , 'W:z4r10p1', 'T:r10'],
          ['T:r11', 'W:z4r11p7', 'PW'       , 'W:z4r11p5', 'PW'       , 'W:z4r11p3', 'PW'       , 'PW'       , 'T:r11'],
          ['T:r12', null       , 'PW'       , 'W:z4r12p5', 'PW'       , 'W:z4r12p3', 'PW'       , 'W:z4r12p1', 'T:r12'],
          ['T:r13', null       , 'PW'       , 'W:z4r13p5', 'PW'       , 'PW'       , 'PW'       , 'PW'       , 'T:r13'],
        ],
      }),
    ];
  }
}
