import GoalsButton from "@/Components/elements/GoalsButton";
import GoalsPopup from "@/Components/elements/GoalsPopup";
import GoalsTextArea from "@/Components/elements/GoalsTextArea";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import { toSlug } from "@/script/utils";
import SelectInput from "@mui/material/Select/SelectInput";
import { createPortal } from "react-dom";
import { SelectInputItem } from "../Product/Components/SelectInput";
import {
    GoalsSelectInput,
    GoalsSelectInputItem,
} from "@/Components/elements/GoalsSelectInput";
import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

const Dialog = ({ showDialog, setShowDialog, orderDetail, setOrderDetail }) => {
    return (
        <div>
            {createPortal(
                <>
                    <OrderDialog
                        {...{
                            showDialog,
                            setShowDialog,
                            orderDetail,
                            setOrderDetail,
                        }}
                    />
                </>,
                document.body
            )}
        </div>
    );
};

export default Dialog;

const OrderDialog = ({
    showDialog,
    setShowDialog,
    orderDetail,
    setOrderDetail,
}) => {
    const [show, setShow] = useState(0);
    const currency = Intl.NumberFormat("id-ID");
    return (
        <GoalsPopup
            show={showDialog}
            setShow={() => setShowDialog(false)}
            className="max-w-[50.8vw] !top-[-2vw]"
        >
            <form className="relative space-y-[1.2vw] w-full">
                <h2 className="text-[1.25vw] text-center">Detail Harga</h2>
                <div className="grid w-full gap-[.8vw]">
                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <strong>ITEM</strong>
                                    </TableCell>
                                    <TableCell>
                                        <strong>HARGA</strong>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <strong>Produk:</strong>
                                    </TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        {orderDetail?.products?.name}
                                    </TableCell>
                                    <TableCell>
                                        {"Rp." +
                                            currency.format(
                                                orderDetail?.form_result
                                                    ?.init_price
                                            )}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>AddOn:</strong>
                                    </TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                {orderDetail?.form_result?.add_on?.map((e) => {
                                    return (
                                        <TableRow>
                                            <TableCell>{e.name}</TableCell>
                                            <TableCell>
                                                {"Rp." +
                                                    currency.format(e.price)}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                <TableRow>
                                    <TableCell>
                                        <strong>Admin:</strong>
                                    </TableCell>
                                    <TableCell>
                                        {"Rp." +
                                            currency.format(
                                                orderDetail?.form_result?.admin
                                            )}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Discount:</strong>
                                    </TableCell>
                                    <TableCell>
                                        -
                                        {"Rp." +
                                            currency.format(
                                                orderDetail?.form_result
                                                    ?.discount
                                            )}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Total:</strong>
                                    </TableCell>
                                    <TableCell>
                                        {"Rp." +
                                            currency.format(
                                                orderDetail?.form_result
                                                    ?.total_price
                                            )}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </form>
        </GoalsPopup>
    );
};
