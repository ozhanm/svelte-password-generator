<script>
    export let thememode;

    let maxlength = 30;
    let options = [
        {
            id: 1,
            image: "very-weak",
            title: "VERY WEAK",
            color: "#b00",
            min: 1,
            max: 4,
        },
        { id: 2, image: "weak", title: "WEAK", color: "#b00", min: 5, max: 7 },
        {
            id: 3,
            image: "good",
            title: "GOOD",
            color: "#f1c80b",
            min: 8,
            max: 8,
        },
        {
            id: 4,
            image: "strong",
            title: "STRONG",
            color: "#23d37f",
            min: 9,
            max: 11,
        },
        {
            id: 5,
            image: "very-strong",
            title: "VERY STRONG",
            color: "#10d303",
            min: 12,
            max: maxlength,
        },
    ];
    let characters = [
        { type: true, text: "ABC", chars: "ABCDEFGHIJKLMNOPRSTUVYZ" },
        { type: true, text: "abc", chars: "abcdefghijklmnoprstuvyz" },
        { type: true, text: "123", chars: "0123456789" },
        { type: true, text: "#$&", chars: "!#$%&*+-.?@" },
        { type: true, text: "şĞö", chars: "ÇĞİÖŞÜçğıöpşü" },
    ];

    let count = 15;
    $: selected = getSelectedItem(count);
    $: image = selected.image;
    $: title = selected.title;
    $: color = selected.color;
    $: password = generatePassword(count, characters);
    $: theme = `theme${thememode}`;

    // Check - uncheck
    const checkClick = (index) => {
        characters[index].type = !characters[index].type;
    };

    // Selected Item
    const getSelectedItem = (count) => {
        let data = options.filter(
            (item) => item.min <= count && item.max >= count
        )[0];
        return data;
    };

    // Generate Password
    const generatePassword = (count, characters) => {
        password = "SveltePass2023";
        let chardata = "";

        characters.map((item) => {
            if (item.type == true) chardata += item.chars;
        });

        if (chardata) {
            password = "";
            for (let i = 1; i <= count; i++) {
                let randomIndex = Math.floor(Math.random() * chardata.length);
                let randomChar = chardata.charAt(randomIndex);
                password += randomChar;
            }
        }

        return password;
    };

    // Count
    const handleClickMinusBtn = () => {
        if (count > 1) count--;
    };
    const handleClickPlusBtn = () => {
        if (count < maxlength) count++;
    };

    // Update Theme
    const updateTheme = () => {
        thememode = thememode == "LIGHT" ? "DARK" : "LIGHT";
    };

    // Copy
    let copytext;
    let copybtn = "COPY";
    const copyPassword = () => {
        copytext.select();
        document.execCommand("copy");
        copybtn = "COPIED";
        setTimeout(() => {
            copybtn = "COPY";
        }, 500);
    };
</script>

<main class={theme}>
    <div class="container">
        <h1>Random Password Generator</h1>
        <p>Create strong and secure passwords to keep your account safe.</p>
        <div class="image">
            <img src={`./images/${image}.svg`} alt={title} />
        </div>
        <div class="row">
            <textarea
                class="password"
                bind:value={password}
                bind:this={copytext}
                readonly
            />
            <div class="flag" style:background-color={color}>{title}</div>
        </div>
        <div class="row">
            <span>Characters used:</span>
            <div class="checkbox">
                {#each characters as row, key}
                    <button
                        class:active={row.type == true}
                        on:click={() => checkClick(key)}>{row.text}</button
                    >
                {/each}
            </div>
        </div>
        <div class="row">
            <span>Password length: <b>{count}</b></span>
            <div class="range">
                <button class="btnminus" on:click={handleClickMinusBtn} />
                <input
                    type="range"
                    name="length"
                    min="1"
                    max={maxlength}
                    bind:value={count}
                />
                <button class="btnplus" on:click={handleClickPlusBtn} />
            </div>
        </div>
        <div class="row buttons">
            <div class="left">
                <span>Theme:</span>
                <button class="themebtn" on:click={updateTheme}
                    >{thememode}</button
                >
            </div>
            <div class="right">
                <button
                    class="refreshbtn"
                    on:click={() => generatePassword(count, characters)}
                    >REFRESH</button
                >
                <button class="copybtn" on:click={copyPassword}
                    >{copybtn}</button
                >
            </div>
        </div>
    </div>
</main>

<style lang="scss">
    $maincolor: #06a36a;
    main {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        text-align: center;
        background: #fff;
        color: #333;
        button {
            color: #333;
        }
        &.themeDARK {
            color: #fff;
            background: #333;
            img {
                filter: invert(1);
            }
            button {
                color: #fff;
            }
            .buttons {
                button {
                    background: #111;
                }
            }
            .container {
                box-shadow: 0 3px 15px rgba(255, 255, 255, 0.4);
            }
        }
        .container {
            width: 100%;
            max-width: 600px;
            height: auto;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);
            margin: 40px 0;
        }
        h1 {
            margin: 0 0 20px;
            font-size: 24px;
        }
        p {
            font-size: 15px;
            margin: 0 0 15px;
        }
        img {
            width: 320px;
            height: auto;
        }
        .row {
            width: 100%;
            margin: 40px 0 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            span {
                font-weight: 400;
            }
        }
        .password {
            all: unset;
            width: 100%;
            height: 50px;
            line-height: 48px;
            border-radius: 10px;
            border: 1px solid #ddd;
            padding: 0 80px 0 20px;
            text-align: left;
            font-size: 20px;
            font-weight: 600;
            letter-spacing: 1px;
            margin: 0;
            resize: none;
            overflow: hidden;
        }
        .flag {
            width: 60px;
            position: absolute;
            padding: 5px 10px;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
            font-size: 11px;
            line-height: 13px;
            border-radius: 5px;
            color: #fff;
            font-weight: 600;
            pointer-events: none;
        }
        .checkbox {
            display: flex;
            flex-wrap: nowrap;
            button {
                padding: 0;
                margin: 0;
                background: none;
                border: 0;
                position: relative;
                display: flex;
                flex-wrap: nowrap;
                font-weight: 600;
                font-size: 16px;
                cursor: pointer;
                &:not(:last-child) {
                    margin-right: 13px;
                }
                &.active {
                    &:before {
                        content: "✔";
                        border-color: $maincolor;
                    }
                }
                &:before {
                    content: "";
                    width: 20px;
                    height: 20px;
                    line-height: 20px;
                    border: 1px solid #ddd;
                    display: block;
                    margin-right: 5px;
                    color: $maincolor;
                    background: #fff;
                }
            }
        }
        .range {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            button {
                width: 40px;
                height: 40px;
                line-height: 36px;
                border-radius: 50%;
                background: none;
                border: 2px solid $maincolor;
                padding: 0;
                margin: 0;
                font-size: 20px;
                font-weight: 700;
                cursor: pointer;
                position: relative;
                color: $maincolor;
                background: #fff;
                &:hover {
                    background: #eee;
                }
                &:after {
                    content: "";
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                    pointer-events: none;
                }
                &.btnminus {
                    &:after {
                        content: "⚊";
                    }
                }
                &.btnplus {
                    &:after {
                        content: "✛";
                    }
                }
            }
            input {
                appearance: none;
                border-radius: 0;
                outline: none;
                width: 220px;
                height: 15px;
                margin: 0 15px;
                background: #ddd;
                border: 0;
                padding: 0;
            }
            input::-webkit-slider-thumb {
                appearance: none;
                width: 25px;
                height: 25px;
                background: $maincolor;
                cursor: pointer;
                border-radius: 5px;
            }

            input::-moz-range-thumb {
                width: 25px;
                height: 25px;
                background: $maincolor;
                cursor: pointer;
            }
        }
        .buttons {
            border-top: 1px solid #eee;
            padding-top: 20px;
            span {
                margin-right: 5px;
            }
            button {
                background: #eee;
                padding: 8px 15px;
                margin: 0;
                font-size: 14px;
                font-weight: 500;
                border-radius: 5px;
                border: 0;
                letter-spacing: 1px;
                cursor: pointer;
                &:hover {
                    opacity: 0.85;
                }
                &:before {
                    margin-right: 5px;
                }
                &.themebtn {
                    &:before {
                        content: "☯";
                    }
                }
                &.refreshbtn {
                    background: #666;
                    color: #fff;
                    &:before {
                        content: "♻";
                    }
                }
                &.copybtn {
                    background: $maincolor;
                    color: #fff;
                    margin-left: 10px;
                    &:before {
                        content: "❐";
                    }
                }
            }
        }
    }

    @media (max-width: 499px) {
        main {
            &.themeDARK {
                .container {
                    box-shadow: none;
                }
            }
            .container {
                padding: 20px;
                box-shadow: none;
                margin: 0;
            }
            .row {
                flex-wrap: wrap;
                margin: 20px 0 0;
                span {
                    width: 100%;
                    margin: 0 0 5px;
                    text-align: left;
                }
            }
            h1 {
                font-size: 20px;
                margin: 0 0 15px;
            }
            p {
                font-size: 14px;
            }
            .image {
                text-align: left;
            }
            img {
                width: 250px;
            }
            .flag {
                top: -120px;
                transform: unset;
            }
            .password {
                height: 40px;
                line-height: 38px;
                padding: 0 15px;
                text-align: center;
                font-size: 18px;
            }
            .checkbox {
                button {
                    &:not(:last-child) {
                        margin-right: 10px;
                    }
                }
            }
            .range {
                button {
                    width: 35px;
                    height: 35px;
                    line-height: 32px;
                    border: 1px solid #06a36a;
                    font-size: 18px;
                }
            }
            .buttons {
                span {
                    display: none;
                }
                button {
                    margin: 0;
                    letter-spacing: 0;
                    padding: 7px 12px;
                }
            }
        }
    }
</style>
