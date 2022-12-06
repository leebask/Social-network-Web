import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import Layout from '../../components/Layout';
import { useEffect, useState } from "react";
import postApi from "../../api/postApi";
import { Link } from 'react-router-dom'

export default function Dashboard() {
    const [result, setResult] = useState({})
    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await postApi.getDashboardAdmin();
                console.log(res,'res dashboard')
                setResult(res)
            } catch (e) {
            }
        }
        fetchDashboard()
        return function cleanup() {
            console.log("Component Will Unmount")
        };
    }, [])
    return (
        <Layout>
            <Stack
                direction='row'
                justifyContent='center'
                alignItems='center'
                marginBottom={'8px'}
                spacing={2}
            >
                <Card sx={{ maxWidth: 345, width: '30%' }}>
                    <Link
                        to={`/admin/users`}
                        style={{ textDecoration: 'none', color: 'black' }}
                    >
                        <CardActionArea sx={{ backgroundColor: '#ccff99' }}>
                            <CardContent>
                                <Typography minHeight={60} gutterBottom variant='h5' component='div'>
                                    Số người dùng mới trong tháng
                                </Typography>
                                <Typography variant='h4' color='text.primary' display={'flex'} justifyContent={'flex-end'}>
                                    {result.numUserMonth}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size='small' color='primary'>
                                Xem chi tiết
                            </Button>
                        </CardActions>
                    </Link>
                </Card>
                <Card sx={{ maxWidth: 345, width: '30%' }}>
                    <Link
                        to={`/admin/posts`}
                        style={{ textDecoration: 'none', color: 'black' }}
                    >
                        <CardActionArea sx={{ backgroundColor: '#ffffcc' }}>
                            <CardContent>
                                <Typography minHeight={60} gutterBottom variant='h5' component='div'>
                                    Số bài viết mới trong tháng
                                </Typography>
                                <Typography variant='h4' color='text.primary' display={'flex'} justifyContent={'flex-end'}>
                                    {result.numPostMonth}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size='small' color='primary'>
                                Xem chi tiết
                            </Button>
                        </CardActions>
                    </Link>
                </Card>
                <Card sx={{ maxWidth: 345, width: '30%' }}>
                    <Link
                        to={`/admin/posts`}
                        style={{ textDecoration: 'none', color: 'black' }}
                    >
                        <CardActionArea>
                            <CardContent sx={{ backgroundColor: '#00FFFF' }}>
                                <Typography minHeight={60} gutterBottom variant='h5' component='div'>
                                    Số lượng tương tác trong tháng
                                </Typography>
                                <Typography variant='h4' color='text.primary' display={'flex'} justifyContent={'flex-end'}>
                                    {result.numCommentMonth}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size='small' color='primary'>
                                Xem chi tiết
                            </Button>
                        </CardActions>
                    </Link>
                </Card>
            </Stack>
            <Stack
                direction='row'
                justifyContent='center'
                alignItems='center'
                spacing={2}
            >
                <Card sx={{ maxWidth: 345, width: '30%' }}>
                    <Link
                        to={`/admin/users`}
                        style={{ textDecoration: 'none', color: 'black' }}
                    >
                        <CardActionArea sx={{ backgroundColor: '#ccff99' }}>
                            <CardContent>
                                <Typography gutterBottom variant='h5' component='div'>
                                    Tất cả người dùng
                                </Typography>
                                <Typography variant='h4' color='text.primary' display={'flex'} justifyContent={'flex-end'}>
                                    {result.numUser}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size='small' color='primary'>
                                Xem chi tiết
                            </Button>
                        </CardActions>
                    </Link>
                </Card>
                <Card sx={{ maxWidth: 345, width: '30%' }}>
                    <Link
                        to={`/admin/posts`}
                        style={{ textDecoration: 'none', color: 'black' }}
                    >
                        <CardActionArea sx={{ backgroundColor: '#ffffcc' }}>
                            <CardContent>
                                <Typography gutterBottom variant='h5' component='div' >
                                    Tất cả bài viết
                                </Typography>
                                <Typography variant='h4' color='text.primary' display={'flex'} justifyContent={'flex-end'}>
                                    {result.numPost}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size='small' color='primary'>
                                Xem chi tiết
                            </Button>
                        </CardActions>
                    </Link>
                </Card>
                <Card sx={{ maxWidth: 345, width: '30%' }}>
                    <Link
                        to={`/admin/posts`}
                        style={{ textDecoration: 'none', color: 'black' }}
                    >
                        <CardActionArea>
                            <CardContent sx={{ backgroundColor: '#00FFFF' }}>
                                <Typography gutterBottom variant='h5' component='div'>
                                    Số lượng tương tác
                                </Typography>
                                <Typography  variant='h4' color='text.primary' display={'flex'} justifyContent={'flex-end'}>
                                    {result.numComment}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size='small' color='primary'>
                                Xem chi tiết
                            </Button>
                        </CardActions>
                    </Link>
                </Card>
            </Stack>

        </Layout>
    );
}
