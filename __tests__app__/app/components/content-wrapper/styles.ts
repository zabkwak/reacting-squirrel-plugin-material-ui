import { Theme } from '@mui/material/styles';
import { createStyles } from '@mui/styles';

import { IProps } from './component';

export default (theme: Theme) => {
	console.log({ theme });
	return createStyles({
		container: {
			// padding: theme.spacing(3),
			// height: `calc(100% - ${theme.spacing(3) * 2}px)`,
			height: '100%',
			// overflow: 'auto',
		},
		containerLoading: {
			padding: 0,
		},
		wrapper: {
			padding: theme.spacing(3),
			width: ({ wrapper }: IProps) => `${wrapper}%`,
			margin: '0 auto',
			boxSizing: 'border-box',
		},
	});
};
