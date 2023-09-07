import {makeStyles} from '@material-ui/core/styles'
import Image from 'next/image'
import Button from '@material-ui/core/Button'
const useStyles = makeStyles(theme => ({
	StayHome: {
		marginBlockEnd: 32,

		position: 'relative',
		[theme.breakpoints.down('xs')]: {
			display: 'none',
		},
		[theme.breakpoints.down('sm')]: {
			display: 'none',
		},
	},
	googleImage: {
		right: 0,
		bottom: 0,
		position: 'absolute',
		display: 'flex',
		alignItems: 'flex-end',
		justifyContent: 'center',
		paddingInlineEnd: 216,
		paddingBlock: 16,
		'& .MuiButton-root:hover': {
			backgroundColor: 'transparent',
		},
		[theme.breakpoints.down('xs')]: {
			padding: 0,
		},
		[theme.breakpoints.up('sm')]: {
			left: 0,
			justifyContent: 'flex-end',
			right: 0,
			bottom: 0,
		},
	},
}))

function FitnessBannerImage() {
	const classes = useStyles()
	return (
		<div className={classes.StayHome}>
			<Image src='https://ik.imagekit.io/lyfngo/web_b2c/public/images/download/fitnessbanner.png' alt='stayhome' objectFit='cover' width={1500} height={360} layout='responsive' />
			<div className={classes.googleImage}>
				<Button>
					<Image src='https://ik.imagekit.io/lyfngo/web_b2c/public/images/icons/playstore.png' alt='playstore' width={128} height={38} />
				</Button>
				<Button>
					<Image src='https://ik.imagekit.io/lyfngo/web_b2c/public/images/icons/appstore.png' alt='appstore' width={128} height={38} />
				</Button>
			</div>
		</div>
	)
}

export default FitnessBannerImage
