import { Avatar, Button, Chip, Divider, Grid, Stack, TextField, Tooltip } from '@mui/material';
import Layout from '../../components/Layout';
import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import BlockIcon from '@mui/icons-material/Block';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { visuallyHidden } from '@mui/utils';
import { useEffect, useState } from "react";
import postApi from "../../api/postApi";
import GENERAL_CONSTANTS from "../../GeneralConstants";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import userApi from "../../api/userApi";
import generalConstants from "../../GeneralConstants";
import SearchIcon from '@mui/icons-material/Search';
import { notify } from '../../utility/toast';
import moment from 'moment';
import GroupIcon from '@mui/icons-material/Group';
import { Export } from '../../components/export/Export';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

export default function User() {

    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState(generalConstants.SORT.REPORT);
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [open, setOpen] = useState(false);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [users, setUsers] = useState([]);
    const [length, setLength] = useState(0)
    const [user, setUser] = useState({})
    const [textSearch, setTextSearch] = useState('');
    const [userOnMonth, setUserOnMonth] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await userApi.getUserAdmin({
                    page,
                    limit,
                    sort: orderBy,
                    direction: order
                });
                console.log('postApi', res);
                setUsers(res.data.items);
                setLength(res.data.totalItem);
            } catch (err) {
            }
        }
        fetchUsers();
        return function cleanup() {
            console.log("Component Will Unmount")
        };
    }, [page, limit, order, orderBy]);
    useEffect(() => {
        if (length > 0) {
            const fetchUsers = async () => {
                try {
                    const res = await userApi.getUserAdmin({
                        page: 0,
                        limit: 1000,
                    });
                    setUserOnMonth(res.data.items?.filter(
                        k =>
                            (moment(k.createdAt).format('M') == moment().format('M'))
                            &&
                            (moment(k.createdAt).format('YYYY') == moment().format('YYYY'))
                    ));
                } catch (err) {
                }
            }
            fetchUsers();
            return function cleanup() {
                console.log("Component Will Unmount")
            };
        }
    }, [length]);
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        setPage((0))
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);

    };
    const handleChangeRowsPerPage = (event) => {
        setLimit(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleBlock = async (userId) => {

        try {

            let res = await userApi.blockUser({ userId });
            notify(res.message);
            console.log(res);
            if(res.status ==='SUCCESS') {
                const fetchUsers = async () => {
                    try {
                        const res = await userApi.getUserAdmin({
                            page,
                            limit,
                            sort: orderBy,
                            direction: order
                        });
                        console.log('postApi', res);
                        setUsers(res.data.items);
                        setLength(res.data.totalItem);
                    } catch (err) {
                    }
                }
                fetchUsers();
                return function cleanup() {
                    console.log("Component Will Unmount")
                };
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleInfo = (user) => {
        setUser(user)
        setOpen(true)
    }

    const headCells = [
        {
            id: GENERAL_CONSTANTS.SORT.USERID,
            numeric: false,
            disablePadding: false,
            label: 'id',
        },
        {
            id: GENERAL_CONSTANTS.SORT.FULLNAME,
            numeric: false,
            disablePadding: true,
            label: 'H??? T??n',
        },
        {
            id: GENERAL_CONSTANTS.SORT.POST,
            numeric: false,
            disablePadding: false,
            label: 'B??i vi???t',
        },

        {
            id: GENERAL_CONSTANTS.SORT.REPORT,
            numeric: true,
            disablePadding: false,
            label: 'L?????t B??o C??o',
        }, {
            id: GENERAL_CONSTANTS.SORT.FOLLOWING,
            numeric: true,
            disablePadding: false,
            label: '??ang theo d??i',
        }, {
            id: GENERAL_CONSTANTS.SORT.FOLLOWED,
            numeric: true,
            disablePadding: false,
            label: '???????c theo d??i',
        }, {
            id: GENERAL_CONSTANTS.SORT.STATUS,
            numeric: true,
            disablePadding: false,
            label: 'Tr???ng th??i',
        }
    ];

    function EnhancedTableHead(props) {
        const { order, orderBy, rowCount, onRequestSort } =
            props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };
        return (
            <TableHead>
                <TableRow>


                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - length) : 0;

    const handleSubmit = () => {
        const fetchUsers = async () => {
            try {
                const res = await userApi.getUserAdmin({
                    page,
                    limit,
                    sort: orderBy,
                    direction: order,
                    textSearch
                });
                console.log('search', page, limit, textSearch);
                setUsers(res.data.items);
                setLength(res.data.totalItem);
            } catch (err) {
            }
        }
        fetchUsers();
    }


    // * dialog
    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));
    const BootstrapDialogTitle = (props) => {
        const { children, onClose, ...other } = props;

        return (
            <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
                {children}
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
        );
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    return <Layout>
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <Stack flexDirection={'row'} marginBottom={4} justifyContent={'flex-end'} gap={2}>
                    <TextField
                        id="standard-search"
                        label="T??m theo username,t??n"
                        type="search"
                        variant="standard"
                        value={textSearch}
                        onChange={(e) => setTextSearch(e.target.value)}
                    />
                    < Button variant="contained"
                        startIcon={<SearchIcon />} onClick={() =>
                            handleSubmit()
                        }>
                        T??m ki???m
                    </Button>
                    <Export
                        csvData={users?.map((user) => (
                            {
                                ID: user?.id,
                                'H??? t??n': user?.fullName,
                                'B??i vi???t': user?.numPost,
                                'L?????t b??o c??o': user?.numIsReported,
                                '??ang theo d??i': user?.numFollowing,
                                '???????c theo d??i': user?.numFollowed,
                                'Avatar': user?.profilePicture,
                                'Username': user?.username,
                                'Ng??y t???o': user?.createdAt,
                                'Tr???ng th??i': !user?.isBlock ? 'Ho???t ?????ng' : "Kh??ng ho???t ?????ng",
                            }
                        ))}
                        fileName={'UsersExport'}
                    />
                </Stack>
                <Chip
                    icon={<GroupIcon />}
                    label="T???ng User"
                />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={users?.length}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                            {users
                                ?.map((user, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            key={user.id}
                                        >

                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                            >
                                                {user.id}
                                            </TableCell>
                                            <TableCell>{user.fullName}</TableCell>
                                            <TableCell align="center">{user.numPost}</TableCell>
                                            <TableCell align="center">{user.numIsReported}</TableCell>
                                            <TableCell align="center">{user.numFollowing}</TableCell>
                                            <TableCell align="center">{user.numFollowed}</TableCell>
                                            <TableCell
                                                align="center">{(user.isBlock == false || user.isBlock == null) ? '??ang ho???t ?????ng' : 'B??? kh??a'}</TableCell>
                                            <TableCell

                                            >
                                                <Stack direction="row" spacing={2}>
                                                    {(user.isBlock == false || user.isBlock == null) ?
                                                        < Button color='error' variant="contained"
                                                            startIcon={<CloseIcon />} onClick={() =>
                                                                handleBlock(user.id)
                                                            }>
                                                            Ch???n
                                                        </Button> :
                                                        < Button color='success' variant="contained"
                                                            startIcon={<CheckIcon />} onClick={() =>
                                                                handleBlock(user.id)
                                                            }>
                                                            B??? ch???n
                                                        </Button>
                                                    }
                                                    <Button variant="contained" endIcon={<InfoIcon />} onClick={() =>
                                                        handleInfo(user)
                                                    }>
                                                        Xem chi ti???t
                                                    </Button>
                                                </Stack>
                                            </TableCell>

                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={length}
                    rowsPerPage={limit}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            <Chip
                icon={<GroupAddIcon />}
                label={'User m???i trong th??ng:' + ' ' + moment().format('M')}
            />
            <Stack
                marginTop={2}
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                // spacing={2}
                flexWrap={'wrap'}
            >
                {
                    userOnMonth?.map(k =>
                        <><Tooltip title={k.fullName} placement="bottom">
                            <Stack alignItems={'center'} width={'120px'} paddingBottom={2} style={{cursor:'pointer'}}
                                onClick={() =>
                                    handleInfo(k)
                                }>

                                <Avatar alt={k.username} src={k?.profilePicture} />
                                <div>{k.username}</div>

                            </Stack>
                        </Tooltip>
                        </>
                    )
                }

            </Stack>
            <div>

                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <BootstrapDialogTitle id="customized-dialog-title"
                        onClose={handleClose}>
                        <Stack direction="row" spacing={4}>

                            <Avatar alt="Remy Sharp"
                                src={user.profilePicture && 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH9uDbCmpIMnQl-CNLn3Am5G20bZDqbTBbveil6lc&s'} />

                            <Typography gutterBottom>
                                {user?.fullName}
                            </Typography>
                        </Stack>
                    </BootstrapDialogTitle>
                    <DialogContent dividers>

                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={6}>
                                Email:
                            </Grid>
                            <Grid item xs={6}>
                                {user?.email}
                            </Grid>
                            <Grid item xs={6}>
                                Username:
                            </Grid>
                            <Grid item xs={6}>
                                {user?.username}
                            </Grid>
                            <Grid item xs={6}>
                                City:
                            </Grid>
                            <Grid item xs={6}>
                                {user?.address}
                            </Grid>
                            <Grid item xs={6}>
                                Ng??y t???o:
                            </Grid>
                            <Grid item xs={6}>
                                {moment(user?.createdAt).format('DD/MM/YYYY')}
                            </Grid>

                        </Grid>


                    </DialogContent>

                </BootstrapDialog>
            </div>

        </Box>

    </Layout>;
}
