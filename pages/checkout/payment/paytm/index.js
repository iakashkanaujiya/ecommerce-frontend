import Head from "next/head";
import { Fragment } from "react";

const Paytm = ({ mid, orderId, txnToken }) => {

    var postUrl = `https://securegw-stage.paytm.in/theia/api/v1/showPaymentPage?mid=${mid}&orderId=${orderId}`;

    return (
        <Fragment>
            <Head>
                <title>Processing Payment</title>
                <script type="text/javascript"> document.paytm.submit(); </script>
            </Head>
                <center>
                    <div style={{ padding: "150px 0" }}>
                        <h1>Please do not refresh this page...</h1>
                        <span>Processing payment</span>
                    </div>
                </center>
                <form method="post" action={postUrl} name="paytm">
                    <input type="hidden" name="mid" value={mid} />
                    <input type="hidden" name="orderId" value={orderId} />
                    <input type="hidden" name="txnToken" value={txnToken} />
                </form>
        </Fragment>
    )
};

export const getServerSideProps = ({ query }) => {
    const { mid, orderId, txnToken } = query;

    if (!mid && !orderId && txnToken) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            mid,
            orderId,
            txnToken
        }
    }

};

export default Paytm;