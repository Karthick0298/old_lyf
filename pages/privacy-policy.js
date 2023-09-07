import {makeStyles, Typography, Grid} from '@material-ui/core'
import Link from 'next/link'
import {useCallback, useEffect, useState} from 'react'
import PrivacyPolicyApi from '../Service/PrivacyPolicy'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {useRouter} from 'next/router'
import Head from 'next/head'
import meta from '../src/model/seo/privacy/data'
const useStyles = makeStyles(theme => ({
	root: {
		// backgroundImage: `url(https://ik.imagekit.io/lyfngo/web_b2c/public/images/picture/background.png)`,
		// backgroundRepeat: 'no-repeat',
		// backgroundSize: 'cover',
		// backgroundPosition: 'center',
		boxSizing: 'border-box',
	},
	heading: {
		backgroundColor: theme.palette.lyfngo.main,
		color: '#FFFFFF',
		textAlign: 'center',
		position: 'Sticky',
		top: 0,
		width: '100%',
		[theme.breakpoints.up('xs')]: {
			paddingBlock: 10,
			fontSize: 16,
		},
		[theme.breakpoints.up('sm')]: {
			paddingBlock: 20,
			fontSize: 20,
		},
	},
	SubHeading: {
		color: theme.palette.paragraph.main,
		[theme.breakpoints.up('xs')]: {
			fontSize: 14,
			paddingBlockStart: 6,
			paddingBlockEnd: 4,
		},
		[theme.breakpoints.up('sm')]: {
			fontSize: 16,
			paddingBlockStart: 10,
			paddingBlockEnd: 4,
		},
	},
	content: {
		// border: '1px dashed red',
		textAlign: 'justify',

		[theme.breakpoints.up('xs')]: {
			paddingBlock: 10,
			paddingInline: 10,
		},
		[theme.breakpoints.up('sm')]: {
			paddingBlock: 20,
			paddingInline: 40,
		},
		[theme.breakpoints.up('md')]: {
			paddingBlock: 20,
			paddingInline: 80,
		},

		'& .MuiTypography-body1': {
			color: theme.palette.paragraph.main,
			[theme.breakpoints.up('xs')]: {
				fontSize: 14,
			},
			[theme.breakpoints.up('sm')]: {
				fontSize: 16,
			},
		},
	},
	contentPrimary: {
		textAlign: 'justify',

		[theme.breakpoints.up('xs')]: {
			paddingBlockEnd: 4,
		},
		[theme.breakpoints.up('sm')]: {
			paddingBlockEnd: 8,
		},
	},
	contentSecondary: {
		textAlign: 'justify',
		paddingInlineStart: 14,
		[theme.breakpoints.up('xs')]: {
			paddingBlockEnd: 4,
		},
		[theme.breakpoints.up('sm')]: {
			paddingBlockEnd: 8,
		},
	},
	contentTertiary: {
		textAlign: 'justify',

		paddingInlineStart: 28,
		[theme.breakpoints.up('xs')]: {
			paddingBlockEnd: 4,
		},
		[theme.breakpoints.up('sm')]: {
			paddingBlockEnd: 8,
		},
	},
	contentFour: {
		textAlign: 'justify',

		paddingInlineStart: 32,
		[theme.breakpoints.up('xs')]: {
			paddingBlockEnd: 4,
		},
		[theme.breakpoints.up('sm')]: {
			paddingBlockEnd: 8,
		},
	},
}))
function PrivacyPolicy() {
	const classes = useStyles()
	const [privacyPolicy, setPrivacyPolicy] = useState()
	const router = useRouter()
	const params = {type: 'lyfngoprivacy'}
	const getPrivacyPolicy = useCallback(() => {
		const onSuccess = res => {
			setPrivacyPolicy(res?.data)
		}
		const onFailure = err => {
			setPrivacyPolicy()
		}
		PrivacyPolicyApi.getPrivacyPolicyApi({...params}).then(onSuccess, onFailure)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	useEffect(() => {
		getPrivacyPolicy()
	}, [getPrivacyPolicy])
	return (
		<>
			<Head>
				<title>{meta.title}</title>
				<meta name='description' content={meta?.description} />
				<meta property='og:title' content={meta?.title} />
				<meta property='og:description' content={meta?.description} />
				<meta property='og:image' content='https://ik.imagekit.io/LyfngoDev/B2C/StaticPages/Logo/lyfngo1200.png' />
				<meta name='google' content='nositelinkssearchbox' key='sitelinks' />
				<meta name='google' content='notranslate' key='notranslate' />
				<link rel='canonical' href='https://lyfngo.com/privacy-policy' />
			</Head>
			<div className={classes.root}>
				<Grid container className={classes.heading}>
					<Grid item md={1} sm={1} xs={2}>
						{/* <ArrowBackIcon style={{cursor: 'pointer'}} onClick={() => router.back()} /> */}
					</Grid>
					<Grid item md={10} sm={1} xs={9}>
						<Typography variant='h5' style={{color: '#fff', fontSize: '22px'}}>
							Privacy & Policy
						</Typography>
					</Grid>
					<Grid item md={1} sm={1} xs={1}></Grid>
				</Grid>
				<div className={classes.content} style={{maxWidth: 1320, margin: 'auto'}}>
					<div dangerouslySetInnerHTML={{__html: privacyPolicy}} />
				</div>
			</div>
		</>
	)
}

export default PrivacyPolicy
