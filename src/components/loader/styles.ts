import { Theme } from '@mui/material/styles';
import { createStyles } from '@mui/styles';

export default (theme: Theme) => createStyles({
	loaderWrapper: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%',
		flexDirection: 'column',
	},
});
