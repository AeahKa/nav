const $siteList = $('.siteList'),
	$add = $siteList.find('li.add'),
	x = localStorage.getItem('x'),
	xObject = JSON.parse(x),
	hashMap = xObject || [
		{ logo: 'B', url: 'https://www.bootcdn.cn' },
		{ logo: 'C', url: 'https://caniuse.com' },
		{ logo: 'C', url: 'https://cssgradient.io' },
		{ logo: 'F', url: 'https://www.figma.com' },
		{ logo: 'G', url: 'https://github.com' },
		{ logo: 'I', url: 'https://www.iconfont.cn' },
		{ logo: 'W', url: 'https://www.wangdoc.com' },
	],
	simplifyUrl = (o) =>
		o
			.replace('https://', '')
			.replace('http://', '')
			.replace('www.', '')
			.replace(/\/.*/, ''),
	render = () => {
		$siteList.find('li:not(.add)').remove(),
			hashMap.forEach((o, t) => {
				const e = $(
					`<li>\n        <div class="site">\n          <div class="logo">${
						o.logo
					}</div>\n          <div class="link">${simplifyUrl(
						o.url
					)}</div>\n          <div class="removeButton">\n            <svg class="icon" aria-hidden="true">\n              <use xlink:href="#icon-remove"></use>\n            </svg>\n\t\t\t\t\t</div>\n        </div>\n      </li>`
				).insertBefore($add);
				e.on('click', () => {
					window.open(o.url, '_self');
				}),
					e.on('click', '.removeButton', (o) => {
						o.stopPropagation(), hashMap.splice(t, 1), render();
					});
			});
	};
render(),
	$('.addButton').on('click', () => {
		let o = window.prompt('请输入想要添加的网址');
		0 !== o.indexOf('http') && (o = 'https://' + o),
			hashMap.push({ logo: simplifyUrl(o)[0], url: o }),
			render();
	}),
	(window.onbeforeunload = () => {
		const o = JSON.stringify(hashMap);
		localStorage.setItem('x', o);
	}),
	$(document).on('keypress', (o) => {
		const { key: t } = o;
		console.log(t);
		for (let o = 0; o < hashMap.length; o++)
			hashMap[o].logo.toLowerCase() === t &&
				window.open(hashMap[o].url, '_self');
	});
//# sourceMappingURL=index.233f7532.js.map
