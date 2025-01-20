import { Campus } from '../campus';
import { Cluster } from '../cluster';
import { ICampus } from '../types';

export class LeHavre extends Campus implements ICampus
{
	emoji = (): string => '🇫🇷';

	name = (): string => 'Le Havre';

	extractorRegexp = (): RegExp =>
		/(?<clusterWithLetter>C(?<cluster>\d+))(?<rowWithLetter>R(?<row>\d+))(?<workspaceWithLetter>P(?<workspace>\d+))/i;

	clusters(): Cluster[] 
	{
		return [
			new Cluster(
			{
				identifier: 'C1',
				name: 'Jötunheim',
				// prettier-ignore
				map:
				[
					['T:R7',	'W:C1R7P1',	'W:C1R7P2',	'W:C1R7P3',	null,			null,	'W:C1R7P4',	'W:C1R7P5',	'W:C1R7P6',	'W:C1R7P7',	null,		null,			null,	null,	'W:C1R7P8',		'W:C1R7P9',		'W:C1R7P10',	'W:C1R7P11',	'W:C1R7P12',	'W:C1R7P13',	null,			'T:R7'],
					['T:R6',	'W:C1R6P1',	'W:C1R6P2',	'W:C1R6P3',	'W:C1R6P4',		null,	'W:C1R6P5',	'W:C1R6P6',	'W:C1R6P7',	'W:C1R6P8',	'W:C1R6P9',	'W:C1R6P10',	null,	null,	'W:C1R6P11',	'W:C1R6P12',	'W:C1R6P13',	'W:C1R6P14',	'W:C1R6P15',	'W:C1R6P16',	'W:C1R6P17',	'T:R6'],
					['T:R5',	null,		null,		null,		null,			null,	'W:C1R5P1',	'W:C1R5P2',	'W:C1R5P3',	'W:C1R5P4',	'W:C1R5P5',	'W:C1R5P6',		null,	null,	'W:C1R5P7',		'W:C1R5P8',		'W:C1R5P9',		'W:C1R5P10',	'W:C1R5P11',	'W:C1R5P12',	'W:C1R5P13',	'T:R5'],
					['T:R4',	null,		null,		null,		null,			null,	'W:C1R4P1',	'W:C1R4P2',	'W:C1R4P3',	'W:C1R4P4',	'W:C1R4P5',	'W:C1R4P6',		null,	null,	'W:C1R4P7',		'W:C1R4P8',		'W:C1R4P9',		'W:C1R4P10',	'W:C1R4P11',	'W:C1R4P12',	'W:C1R4P13',	'T:R4'],
					['T:R3',	null,		null,		null,		null,			null,	'W:C1R3P1',	'W:C1R3P2',	'W:C1R3P3',	'W:C1R3P4',	'W:C1R3P5',	'W:C1R3P6',		null,	null,	'W:C1R3P7',		'W:C1R3P8',		'W:C1R3P9',		'W:C1R3P10',	'W:C1R3P11',	'W:C1R3P12',	'W:C1R3P13',	'T:R3'],
					['T:R2',	null,		null,		null,		null,			null,	'W:C1R2P1',	'W:C1R2P2',	'W:C1R2P3',	'W:C1R2P4',	'W:C1R2P5',	'W:C1R2P6',		null,	null,	'W:C1R2P7',		'W:C1R2P8',		'W:C1R2P9',		'W:C1R2P10',	'W:C1R2P11',	'W:C1R2P12',	'W:C1R2P13',	'T:R2'],
					['T:R1',	null,		null,		null,		null,			null,	'W:C1R1P1',	'W:C1R1P2',	'W:C1R1P3',	'W:C1R1P4',	'W:C1R1P5',	'W:C1R1P6',		null,	null,	null,			'W:C1R1P7',		'W:C1R1P8',		'W:C1R1P9',		'W:C1R1P10',	'W:C1R1P11',	'W:C1R1P12',	'T:R1'],
				],
			}),

			new Cluster(
			{
				identifier: 'C2',
				name: 'Niflheim',
				// prettier-ignore
				map:
				[
					['W:C2R1P1',	'W:C2R2P1',	'W:C2R3P1',	'W:C2R4P1',	'W:C2R5P1', 'W:C2R6P1',	'W:C2R7P1',	'W:C2R8P1',	'W:C2R9P1',	'W:C2R10P1',	'W:C2R11P1',	'W:C2R12P1'],
					['W:C2R1P2',	'W:C2R2P2',	'W:C2R3P2',	'W:C2R4P2',	'W:C2R5P2', 'W:C2R6P2',	'W:C2R7P2',	'W:C2R8P2',	'W:C2R9P2',	'W:C2R10P2',	'W:C2R11P2',	'W:C2R12P2'],
					['W:C2R1P3',	'W:C2R2P3',	'W:C2R3P3',	'W:C2R4P3',	'W:C2R5P3', 'W:C2R6P3',	'W:C2R7P3',	'W:C2R8P3',	'W:C2R9P3',	'W:C2R10P3',	'W:C2R11P3',	'W:C2R12P3'],
					['W:C2R1P4',	'W:C2R2P4',	'W:C2R3P4',	'W:C2R4P4',	'W:C2R5P4', 'W:C2R6P4',	'W:C2R7P4',	'W:C2R8P4',	'W:C2R9P4',	'W:C2R10P4',	'W:C2R11P4',	'W:C2R12P4'],
					['W:C2R1P5',	'W:C2R2P5',	'W:C2R3P5',	'W:C2R4P5',	'W:C2R5P5', 'W:C2R6P5',	'W:C2R7P5',	'W:C2R8P5',	'W:C2R9P5',	'W:C2R10P5',	'W:C2R11P5',	'W:C2R12P5'],
					['W:C2R1P6',	'W:C2R2P6',	'W:C2R3P6',	'W:C2R4P6',	null,		'W:C2R6P6',	'W:C2R7P6',	'W:C2R8P6',	null,		null,			'W:C2R11P6',	'W:C2R12P6'],
					['T:R1',		'T:R2',		'T:R3',		'T:R4',		'T:R5',		'T:R6',		'T:R7',		'T:R8',		'T:R9',		'T:R10',		'T:R11',		'T:R12'],
				],
			}),
		];
	}
}
