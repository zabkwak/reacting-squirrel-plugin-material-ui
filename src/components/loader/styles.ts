import { createStyles, Theme } from '@material-ui/core/styles';

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
