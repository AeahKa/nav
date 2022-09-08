const $siteList = $('.siteList');
const $add = $siteList.find('li.add');
const x = localStorage.getItem('x');
const xObject = JSON.parse(x);
const hashMap = xObject || [
	{ logo: 'B', url: 'https://www.bootcdn.cn' },
	{ logo: 'C', url: 'https://caniuse.com' },
	{ logo: 'C', url: 'https://cssgradient.io' },
	{ logo: 'F', url: 'https://www.figma.com' },
	{ logo: 'G', url: 'https://github.com' },
	{ logo: 'I', url: 'https://www.iconfont.cn' },
	{ logo: 'W', url: 'https://www.wangdoc.com' },
];
const simplifyUrl = (url) => {
	return (
		url
			.replace('https://', '')
			.replace('http://', '')
			.replace('www.', '')
			// .replace('.com', '')
			// .replace('.cn', '')
			.replace(/\/.*/, '')
	);
};
const render = () => {
	$siteList.find('li:not(.add)').remove();
	hashMap.forEach((node, index) => {
		const $li = $(
			`<li>
        <div class="site">
          <div class="logo">${node.logo}</div>
          <div class="link">${simplifyUrl(node.url)}</div>
          <div class="removeButton">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-remove"></use>
            </svg>
					</div>
        </div>
      </li>`
		).insertBefore($add);
		$li.on('click', () => {
			window.open(node.url, '_self');
		});
		$li.on('click', '.removeButton', (e) => {
			e.stopPropagation();
			hashMap.splice(index, 1);
			render();
		});
	});
};

render();

$('.addButton').on('click', () => {
	let url = window.prompt('请输入想要添加的网址');
	if (url.indexOf('http') !== 0) {
		url = 'https://' + url;
	}
	hashMap.push({
		logo: simplifyUrl(url)[0],
		url: url,
	});
	render();
});

window.onbeforeunload = () => {
	const string = JSON.stringify(hashMap);
	localStorage.setItem('x', string);
};

$(document).on('keypress', (e) => {
	const { key } = e;
	console.log(key);
	for (let i = 0; i < hashMap.length; i++) {
		if (hashMap[i].logo.toLowerCase() === key) {
			window.open(hashMap[i].url, '_self');
		}
	}
});
