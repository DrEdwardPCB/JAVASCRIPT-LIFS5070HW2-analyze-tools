/**
 * // Return RC low-pass filter output samples, given input samples,
// time interval dt, and time constant RC
function lowpass(real[0..n] x, real dt, real RC)
    var real[0..n] y
    var real α := dt / (RC + dt)
    y[0] := α * x[0]
    for i from 1 to n
        y[i] := α * x[i] + (1-α) * y[i-1]
    return y
 */
export const Lowpass=(data, dt, cutofffequency)=>{
    var y=[]
    var RC=1/(cutofffequency/2*Math.PI)
    var alpha = dt/(RC+dt)
    y[0]=data[0]*alpha
    for(var i=1;i<data.length;i++){
        y[i]=alpha*data[i]+(1-alpha)*y[i-1]
    }
    return y
}