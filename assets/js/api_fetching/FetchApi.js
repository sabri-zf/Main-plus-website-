
export async function fetchAPI(url) {
    try {
        const response = await fetch(url);

        if (response.status != 200) {
            console.error(`HTTP:response.status| Erorr occurred in server`);
            return undefined;
        }

        const result = await response.json();

        return result;
    } catch (e) {
        console.error(e);
        return undefined;
    }
}

export async function PostQueryAPI(url, data) {

    try {

        const response = await fetch(`${url}?Axis=${data}`, {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            },
        });

        if (!response.ok) {
            console.error("the post operation has been failed");
            return;
        }


        const responseData = await response.json();

        console.log(`Succeed: ${responseData}`);

        return responseData;
    } catch (e) {
        console.log(e);
    }
}