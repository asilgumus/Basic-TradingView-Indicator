//@version=4
study("BB + RSI Stratejisi", shorttitle = "BB+RSI STR", overlay = true)

rsiVal = input(defval = 20, minval = 1, title="RSI Value", type = input.integer)
rsi14 = rsi(close, 14)

//BB Starting

length = input(20, minval = 1)
src = input(close, title="Source")
mult = input(2.0, minval=0.001, maxval=50,title="StdDev")
basis = sma(src,length)
dev = mult * stdev(src, length)
upper = basis + dev
lower = basis - dev
offset = input(0, "Offset", minval = -500, maxval = 500)
plot(basis,"Basis", color = #2962FF, offset = offset)
p1 = plot(basis,"Upper", color = #2962FF, offset = offset)
p2 = plot(basis,"Lower", color = #2962FF, offset = offset)
fill(p1,p2, title = "Background", color=color.rgb(33,150,243,95))

if (rsi14[2] < rsiVal and rsi14[1] > rsiVal)
    if(close[2] < lower[2] and close[1] > lower[1]) //BB
        l= label.new(bar_index, na, "BB\nLong\nEntry: " + tostring(close[1], color = color.green, textcolor= color.white, style =label.style_labelup,yloc = yloc.belowbar))
