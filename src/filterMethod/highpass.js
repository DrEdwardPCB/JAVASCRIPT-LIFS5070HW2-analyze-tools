/**
 * // Return RC high-pass filter output samples, given input samples,
// time interval dt, and time constant RC
function highpass(real[0..n] x, real dt, real RC)
    var real[0..n] y
    var real α := RC / (RC + dt)
    y[0] := x[0]
    for i from 1 to n
        y[i] := α × y[i−1] + α × (x[i] − x[i−1])
    return y
 */
function highpass(data, dt, cutofffequency){
    var y=[]
    var RC=1/(cutofffequency/2*Math.PI)
    var alpha = RC/(RC+dt)
    y[0]=data[0]*alpha
    for(var i=1;i<data.length;i++){
        y[i]=alpha*y[i-1]+alhpa*(data[i]=data[i-1])
    }
    return y
}